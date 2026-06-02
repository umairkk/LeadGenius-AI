import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ token: string }> };

const pixel = Uint8Array.from(Buffer.from("R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==", "base64"));

export async function GET(_request: Request, context: RouteContext) {
  const { token } = await context.params;
  const supabase = createSupabaseAdminClient();

  await supabase
    .from("emails")
    .update({ status: "opened", opened_at: new Date().toISOString() })
    .eq("tracking_token", token);

  return new NextResponse(pixel, {
    status: 200,
    headers: {
      "content-type": "image/gif",
      "cache-control": "no-store, max-age=0"
    }
  });
}
