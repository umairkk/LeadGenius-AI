import OpenAI from "openai";
import { getServerEnv } from "@/lib/env";
import {
  generatedEmailSchema,
  replyClassificationResultSchema,
  researchResultSchema,
  type GeneratedEmailSet,
  type ResearchResult
} from "@/lib/validation";
import { emailSystemPrompt, emailUserPrompt, replyClassificationPrompt, researchSystemPrompt, researchUserPrompt } from "@/lib/ai/prompts";
import type { Database } from "@/types/database";

function openai() {
  const env = getServerEnv();
  return { client: new OpenAI({ apiKey: env.OPENAI_API_KEY }), model: env.OPENAI_MODEL };
}

async function jsonCompletion(system: string, user: string) {
  const { client, model } = openai();
  const completion = await client.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    temperature: 0.4
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response.");
  }

  return JSON.parse(content) as unknown;
}

export async function researchLead(lead: Database["public"]["Tables"]["leads"]["Row"], websiteText: string): Promise<ResearchResult> {
  const json = await jsonCompletion(researchSystemPrompt(), researchUserPrompt(lead, websiteText));
  return researchResultSchema.parse(json);
}

export async function generateLeadEmails(
  lead: Database["public"]["Tables"]["leads"]["Row"],
  research: ResearchResult
): Promise<GeneratedEmailSet> {
  const json = await jsonCompletion(emailSystemPrompt(), emailUserPrompt(lead, research));
  return generatedEmailSchema.parse(json);
}

export async function classifyReply(body: string) {
  const json = await jsonCompletion("You classify B2B sales replies. Return only valid JSON.", replyClassificationPrompt(body));
  return replyClassificationResultSchema.parse(json);
}
