import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServerEnv } from "@/lib/env";
import { parseLeadCsv } from "@/lib/csv";
import { rateLimit } from "@/lib/rate-limit";
import { requireUser } from "@/lib/supabase/server";
import { uploadLeadsSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, "lead-upload");
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const env = getServerEnv();
  const formData = await request.formData();
  const file = formData.get("file");
  const campaignName = formData.get("campaignName");
  const parsedInput = uploadLeadsSchema.safeParse({ campaignName });

  if (!parsedInput.success) {
    return NextResponse.json({ error: "Campaign name is required" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "CSV file is required" }, { status: 400 });
  }

  if (file.size > env.CSV_UPLOAD_MAX_BYTES) {
    return NextResponse.json({ error: "CSV file exceeds upload limit" }, { status: 413 });
  }

  if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
    return NextResponse.json({ error: "Only CSV uploads are supported" }, { status: 400 });
  }

  const leads = parseLeadCsv(await file.text());
  if (leads.length === 0) {
    return NextResponse.json({ error: "CSV did not contain any leads" }, { status: 400 });
  }

  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .insert({ user_id: user.id, name: parsedInput.data.campaignName, status: "draft" })
    .select("id, name")
    .single();

  if (campaignError) {
    return NextResponse.json({ error: campaignError.message }, { status: 500 });
  }

  const { error: leadsError } = await supabase.from("leads").insert(
    leads.map((lead) => ({
      id: randomUUID(),
      user_id: user.id,
      campaign_id: campaign.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      website: lead.website,
      linkedin_url: lead.linkedin_url,
      status: "new"
    }))
  );

  if (leadsError) {
    return NextResponse.json({ error: leadsError.message }, { status: 500 });
  }

  await supabase.from("analytics").upsert(
    {
      user_id: user.id,
      campaign_id: campaign.id,
      total_leads: leads.length
    },
    { onConflict: "campaign_id" }
  );

  return NextResponse.json({ campaign, imported: leads.length });
}
