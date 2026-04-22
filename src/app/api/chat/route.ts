import { type NextRequest } from "next/server";
import { streamChat } from "@/server/services/llm";
import { buildSystemPrompt } from "@/server/services/prompts";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { profiles } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { llmRateLimiter } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // 1. Verify Authentication
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Apply Rate Limiting (30 queries/day)
  const { success, remaining } = await llmRateLimiter.limit(session.user.id);
  if (!success) {
    return new Response(
      `Daily limit reached. ${remaining} queries left. Resets in 24h.`,
      { status: 429 }
    );
  }

  let body: { messages?: { role: "user" | "assistant"; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const { messages } = body;
  if (!messages || messages.length === 0) {
    return new Response("No messages provided", { status: 400 });
  }

  // 3. Fetch User Profile for AI Context
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, session.user.id),
  });

  const systemPrompt = buildSystemPrompt(profile ?? null);

  // 4. SSE Streaming response
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await streamChat(messages, systemPrompt, (token) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ token })}\n\n`)
          );
        });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        console.error("[chat/route] Gemini stream error:", err);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "AI service error. Please try again." })}\n\n`
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
