import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { sendOutboundEmail } from "@/lib/email/resend";
import { requireUser } from "@/lib/supabase/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ emailId: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const limit = rateLimit(request, "email-send");
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { emailId } = await context.params;
  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: email, error: emailError } = await supabase
    .from("emails")
    .select("*, leads(email, name, company)")
    .eq("id", emailId)
    .eq("user_id", user.id)
    .single();

  if (emailError || !email) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  if (email.kind === "linkedin_message") {
    return NextResponse.json({ error: "LinkedIn messages are drafted only and cannot be sent by Resend" }, { status: 400 });
  }

  if (!email.subject) {
    return NextResponse.json({ error: "Subject is required to send email" }, { status: 400 });
  }

  const lead = Array.isArray(email.leads) ? email.leads[0] : email.leads;
  if (!lead?.email) {
    return NextResponse.json({ error: "Lead email is missing" }, { status: 400 });
  }

  const sent = await sendOutboundEmail({
    to: lead.email,
    subject: email.subject,
    body: email.body,
    trackingToken: email.tracking_token
  });

  await supabase
    .from("emails")
    .update({
      status: "sent",
      resend_message_id: sent?.id ?? null,
      sent_at: new Date().toISOString()
    })
    .eq("id", email.id)
    .eq("user_id", user.id);

  await supabase.from("leads").update({ status: "sent" }).eq("id", email.lead_id).eq("user_id", user.id);

  return NextResponse.json({ messageId: sent?.id });
}
