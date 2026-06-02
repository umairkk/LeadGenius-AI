import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { generateLeadEmails, researchLead } from "@/lib/ai/research";
import { fetchWebsiteText } from "@/lib/website";
import { rateLimit } from "@/lib/rate-limit";
import { requireUser } from "@/lib/supabase/server";
import type { EmailKind } from "@/types/database";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ leadId: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const limit = rateLimit(request, "lead-research");
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { leadId } = await context.params;
  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .eq("user_id", user.id)
    .single();

  if (leadError || !lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  await supabase.from("leads").update({ status: "researching" }).eq("id", lead.id).eq("user_id", user.id);

  const websiteText = await fetchWebsiteText(lead.website);
  const research = await researchLead(lead, websiteText);
  const emails = await generateLeadEmails(lead, research);

  const { error: researchError } = await supabase.from("research_data").upsert(
    {
      user_id: user.id,
      lead_id: lead.id,
      company_description: research.companyDescription,
      industry: research.industry,
      company_size: research.companySize,
      products_services: research.productsServices,
      company_summary: research.companySummary,
      business_overview: research.businessOverview,
      pain_points: research.painPoints,
      growth_opportunities: research.growthOpportunities,
      business_goals: research.businessGoals,
      outreach_angles: research.outreachAngles,
      source_url: lead.website,
      raw_response: research
    },
    { onConflict: "lead_id" }
  );

  if (researchError) {
    return NextResponse.json({ error: researchError.message }, { status: 500 });
  }

  await supabase.from("emails").delete().eq("lead_id", lead.id).eq("user_id", user.id).eq("status", "draft");

  const emailRows: Array<{
    id: string;
    user_id: string;
    lead_id: string;
    campaign_id: string | null;
    kind: EmailKind;
    subject: string | null;
    body: string;
    status: "draft";
    tracking_token: string;
  }> = [
    {
      id: randomUUID(),
      user_id: user.id,
      lead_id: lead.id,
      campaign_id: lead.campaign_id,
      kind: "cold_email",
      subject: emails.coldEmail.subject,
      body: emails.coldEmail.body,
      status: "draft",
      tracking_token: randomUUID()
    },
    {
      id: randomUUID(),
      user_id: user.id,
      lead_id: lead.id,
      campaign_id: lead.campaign_id,
      kind: "follow_up_1",
      subject: emails.followUp1.subject,
      body: emails.followUp1.body,
      status: "draft",
      tracking_token: randomUUID()
    },
    {
      id: randomUUID(),
      user_id: user.id,
      lead_id: lead.id,
      campaign_id: lead.campaign_id,
      kind: "follow_up_2",
      subject: emails.followUp2.subject,
      body: emails.followUp2.body,
      status: "draft",
      tracking_token: randomUUID()
    },
    {
      id: randomUUID(),
      user_id: user.id,
      lead_id: lead.id,
      campaign_id: lead.campaign_id,
      kind: "linkedin_message",
      subject: null,
      body: emails.linkedInMessage.body,
      status: "draft",
      tracking_token: randomUUID()
    }
  ];

  const { error: emailError } = await supabase.from("emails").insert(emailRows);
  if (emailError) {
    return NextResponse.json({ error: emailError.message }, { status: 500 });
  }

  await supabase
    .from("leads")
    .update({ status: "email_generated", enrichment: research })
    .eq("id", lead.id)
    .eq("user_id", user.id);

  if (lead.campaign_id) {
    await supabase
      .from("analytics")
      .update({ emails_generated: emailRows.length })
      .eq("campaign_id", lead.campaign_id)
      .eq("user_id", user.id);
  }

  return NextResponse.json({ research, emails: emailRows.length });
}
