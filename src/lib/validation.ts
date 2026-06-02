import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || null)
  .pipe(z.string().url().nullable());

export const leadCsvRowSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Valid email is required"),
  company: z.string().trim().min(1, "Company is required"),
  website: optionalUrl,
  linkedin_url: optionalUrl
});

export const uploadLeadsSchema = z.object({
  campaignName: z.string().trim().min(1).max(120)
});

export const researchRequestSchema = z.object({
  leadId: z.string().uuid()
});

export const sendEmailRequestSchema = z.object({
  emailId: z.string().uuid()
});

export const replyClassificationSchema = z.object({
  leadId: z.string().uuid().optional(),
  emailId: z.string().uuid().optional(),
  from: z.string().email(),
  body: z.string().min(1).max(12000)
});

export const researchResultSchema = z.object({
  companyDescription: z.string(),
  industry: z.string(),
  companySize: z.string(),
  productsServices: z.array(z.string()).min(1),
  companySummary: z.string(),
  businessOverview: z.string(),
  painPoints: z.array(z.string()).min(1),
  growthOpportunities: z.array(z.string()).min(1),
  businessGoals: z.array(z.string()).min(1),
  outreachAngles: z.array(z.string()).min(1)
});

export const generatedEmailSchema = z.object({
  coldEmail: z.object({
    subject: z.string().min(1),
    body: z.string().min(1)
  }),
  followUp1: z.object({
    subject: z.string().min(1),
    body: z.string().min(1)
  }),
  followUp2: z.object({
    subject: z.string().min(1),
    body: z.string().min(1)
  }),
  linkedInMessage: z.object({
    body: z.string().min(1)
  })
});

export const replyClassificationResultSchema = z.object({
  category: z.enum(["positive", "negative", "neutral", "meeting_request", "unsubscribe"]),
  confidence: z.number().min(0).max(1),
  summary: z.string(),
  nextStep: z.string()
});

export type LeadCsvRow = z.infer<typeof leadCsvRowSchema>;
export type ResearchResult = z.infer<typeof researchResultSchema>;
export type GeneratedEmailSet = z.infer<typeof generatedEmailSchema>;
