import { Resend } from "resend";
import { getServerEnv } from "@/lib/env";
import { absoluteUrl } from "@/lib/utils";

export async function sendOutboundEmail(input: {
  to: string;
  subject: string;
  body: string;
  trackingToken: string;
}) {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const trackingPixel = absoluteUrl(`/api/track/open/${input.trackingToken}`);
  const html = `${input.body.replace(/\n/g, "<br />")}<img src="${trackingPixel}" width="1" height="1" alt="" />`;

  const result = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: input.to,
    subject: input.subject,
    text: input.body,
    html
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
