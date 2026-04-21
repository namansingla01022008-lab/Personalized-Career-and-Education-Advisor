import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Streams a Gemini response token-by-token.
 * Calls onToken for each text chunk and returns the full response text.
 */
export async function streamChat(
  messages: ChatMessage[],
  systemPrompt: string,
  onToken: (token: string) => void
): Promise<string> {
  // Build the conversation history in Gemini's format
  const geminiHistory = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // The last message is the current user turn
  const lastMessage = messages[messages.length - 1];

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: 1024,
    },
    history: geminiHistory,
  });

  let fullText = "";

  const stream = await chat.sendMessageStream({
    message: lastMessage?.content ?? "",
  });

  for await (const chunk of stream) {
    const token = chunk.text ?? "";
    fullText += token;
    onToken(token);
  }

  return fullText;
}

/**
 * Non-streaming single call — useful for structured JSON generation.
 */
export async function generateContent(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text ?? "";
}
