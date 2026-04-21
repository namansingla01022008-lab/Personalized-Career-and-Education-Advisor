import { type NextRequest } from "next/server";
import { streamChat } from "@/server/services/llm";
import { buildSystemPrompt } from "@/server/services/prompts";

// ---------------------------------------------------------------------------
// NOTE: Auth + DB + rate-limiting will be wired here in Phase 2–4.
// For now this is a functional stub you can test immediately.
// Replace the TODO sections once BetterAuth and Drizzle are set up.
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // TODO (Phase 2): verify BetterAuth session
  // const session = await auth.api.getSession({ headers: req.headers })
  // if (!session) return new Response("Unauthorized", { status: 401 })

  // TODO (Phase 4): apply Upstash rate limiter
  // const { success } = await llmRateLimiter.limit(session.user.id)
  // if (!success) return new Response("Rate limit exceeded — 30 queries/day on free tier", { status: 429 })

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

  // TODO (Phase 1+2): fetch real user profile from Drizzle + Neon
  // const profile = await db.query.profiles.findFirst({
  //   where: eq(profiles.userId, session.user.id),
  // })
  const profile = null; // stub until DB is set up

  const systemPrompt = buildSystemPrompt(profile);

  // --- SSE streaming response ---
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        await streamChat(messages, systemPrompt, (token) => {
          // Each token is sent as a Server-Sent Event
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ token })}\n\n`)
          );
        });
        // Signal the client that streaming is complete
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        console.error("[chat/route] Gemini stream error:", err);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ error: "AI service temporarily unavailable. Please try again." })}\n\n`
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
      "X-Accel-Buffering": "no", // disable Nginx buffering on Vercel
    },
  });
}
