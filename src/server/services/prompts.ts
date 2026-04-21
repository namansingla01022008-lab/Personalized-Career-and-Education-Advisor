// Lightweight inline type — no external imports needed yet.
// In Phase 1, replace this with:
//   import type { InferSelectModel } from "drizzle-orm"
//   import { profiles } from "@/server/db/schema"
type ProfileLike = {
  educationLevel?: string | null;
  stream?: string | null;
  skills?: { name: string }[] | null;
  interests?: string[] | null;
  primaryGoal?: string | null;
  incomeGoalINR?: number | null;
  preferredWorkMode?: string | null;
  workExperienceMonths?: number | null;
  targetLocation?: string | null;
};

/**
 * Builds the Gemini system instruction from the user's profile.
 *
 * IMPORTANT — PII rule: Never include real name, email, phone, or user ID
 * in the prompt sent to the LLM. Only aggregated descriptors go here.
 */
export function buildSystemPrompt(profile: ProfileLike | null): string {
  const profileSummary = profile
    ? `
User Profile (anonymised):
- Education Level: ${profile.educationLevel ?? "Not specified"}
- Stream / Field: ${profile.stream ?? "Not specified"}
- Skills: ${(profile.skills ?? []).map((s) => s.name).join(", ") || "None listed"}
- Interests: ${(profile.interests ?? []).join(", ") || "Not specified"}
- Work Experience: ${profile.workExperienceMonths ?? 0} months
- Preferred Work Mode: ${profile.preferredWorkMode ?? "Any"}
- Target Location: ${profile.targetLocation ?? "Not specified"}
- Primary Goal: ${profile.primaryGoal ?? "Not specified"}
- Monthly Income Goal: ₹${profile.incomeGoalINR ?? "Not specified"}
`.trim()
    : "No profile available yet. Provide general guidance.";

  return `You are PathWise, a friendly and expert career counsellor for students and professionals in India.

${profileSummary}

Instructions:
1. Provide personalised career and course advice based on the user profile above.
2. Always include salary benchmarks (entry, mid, senior) in INR when recommending careers.
3. List the top 3 actionable next steps the user can take immediately.
4. Identify skill gaps if the user asks about a specific career.
5. Keep tone warm, encouraging, and highly specific — never give generic advice.
6. At the END of your response, output a JSON block wrapped in <JSON></JSON> tags with EXACTLY this structure (no extra keys):

<JSON>
{
  "careerSuggestions": [
    { "title": "Career Title", "matchScore": 85, "description": "One-sentence description" }
  ],
  "skillGaps": [
    { "skill": "Skill Name", "priority": 1, "estimatedHours": 40 }
  ],
  "salaryRanges": {
    "entry": 400000,
    "mid": 800000,
    "senior": 1500000,
    "currency": "INR"
  },
  "nextSteps": ["Step 1", "Step 2", "Step 3"],
  "resourceQueryHints": ["search query 1", "search query 2"]
}
</JSON>

The JSON block must always be present, even if some arrays are empty.`;
}

/**
 * Parses the <JSON>...</JSON> block from a Gemini response.
 * Returns null if the block is missing or malformed.
 */
export function parseStructuredData(fullText: string) {
  const match = fullText.match(/<JSON>([\s\S]*?)<\/JSON>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

/**
 * Strips the <JSON>...</JSON> block from the response text
 * so only the readable advisory text is shown in the chat UI.
 */
export function stripJsonBlock(text: string): string {
  return text.replace(/<JSON>[\s\S]*?<\/JSON>/g, "").trim();
}
