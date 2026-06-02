import type { LeadCsvRow, ResearchResult } from "@/lib/validation";
import type { Database } from "@/types/database";

type Lead = Database["public"]["Tables"]["leads"]["Row"] | LeadCsvRow;

export function researchSystemPrompt() {
  return `You are LeadGenius AI, a B2B research analyst. Return only valid JSON. Be specific, factual, and conservative. If a detail cannot be inferred, state a careful estimate instead of inventing facts.`;
}

export function researchUserPrompt(lead: Lead, websiteText: string) {
  return `Research this prospect and company for outbound sales personalization.

Lead:
- Name: ${lead.name}
- Email: ${lead.email}
- Company: ${lead.company}
- Website: ${lead.website ?? "Not supplied"}
- LinkedIn: ${lead.linkedin_url ?? "Not supplied"}

Website text or fetch note:
${websiteText}

Return JSON with these exact keys:
companyDescription, industry, companySize, productsServices, companySummary, businessOverview, painPoints, growthOpportunities, businessGoals, outreachAngles.
Use arrays for productsServices, painPoints, growthOpportunities, businessGoals, outreachAngles.`;
}

export function emailSystemPrompt() {
  return `You are an expert B2B outbound copywriter. Return only valid JSON. Write concise, human, personalized outreach. Avoid spam language, hype, excessive punctuation, fake flattery, and unverifiable claims. Include a clear low-friction call to action.`;
}

export function emailUserPrompt(lead: Database["public"]["Tables"]["leads"]["Row"], research: ResearchResult) {
  return `Generate outreach for this lead.

Lead:
- Name: ${lead.name}
- Company: ${lead.company}
- Email: ${lead.email}
- Website: ${lead.website ?? "Not supplied"}

Research:
${JSON.stringify(research, null, 2)}

Return JSON with exact keys:
{
  "coldEmail": { "subject": string, "body": string },
  "followUp1": { "subject": string, "body": string },
  "followUp2": { "subject": string, "body": string },
  "linkedInMessage": { "body": string }
}

Constraints:
- Cold email under 130 words.
- Follow-ups under 90 words.
- LinkedIn message under 500 characters.
- Mention company-specific details and likely pain points.
- No spam trigger phrases such as "guaranteed", "risk-free", or "limited time".`;
}

export function replyClassificationPrompt(body: string) {
  return `Classify this reply and recommend the next step. Return JSON with keys category, confidence, summary, nextStep. Category must be one of positive, negative, neutral, meeting_request, unsubscribe.

Reply:
${body}`;
}
