import { NextRequest, NextResponse } from "next/server";
import { classifyReply } from "@/lib/ai/research";
import { rateLimit } from "@/lib/rate-limit";
import { requireUser } from "@/lib/supabase/server";
import { replyClassificationSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const limit = rateLimit(request, "reply-classify");
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { supabase, user } = await requireUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = replyClassificationSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: "Invalid reply payload" }, { status: 400 });
  }

  const classification = await classifyReply(payload.data.body);

  if (payload.data.emailId) {
    await supabase
      .from("emails")
      .update({ status: "replied", replied_at: new Date().toISOString() })
      .eq("id", payload.data.emailId)
      .eq("user_id", user.id);
  }

  if (payload.data.leadId) {
    await supabase
      .from("leads")
      .update({ status: classification.category === "meeting_request" ? "meeting_booked" : "replied" })
      .eq("id", payload.data.leadId)
      .eq("user_id", user.id);
  }

  return NextResponse.json(classification);
}
