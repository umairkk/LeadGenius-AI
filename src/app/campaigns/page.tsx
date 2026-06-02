import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { ResearchButton } from "@/components/research-button";
import { SendEmailButton } from "@/components/send-email-button";
import { requireUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CampaignsPage() {
  const { supabase, user } = await requireUser();
  if (!user) redirect("/login");

  const [{ data: campaigns }, { data: leads }, { data: emails }] = await Promise.all([
    supabase.from("campaigns").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("leads").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50),
    supabase.from("emails").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50)
  ]);

  return (
    <DashboardShell>
      <p className="text-sm text-cyan-300">Campaign management</p>
      <h1 className="mt-2 text-4xl font-bold">Campaigns</h1>
      <div className="mt-8 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <h2 className="text-xl font-semibold">Campaigns</h2>
          <div className="mt-5 space-y-3">
            {(campaigns ?? []).map((campaign) => (
              <div key={campaign.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold">{campaign.name}</p>
                <p className="mt-1 text-sm text-slate-400">{campaign.status}</p>
              </div>
            ))}
            {campaigns?.length === 0 ? <p className="text-sm text-slate-400">Upload leads to create your first campaign.</p> : null}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Latest leads</h2>
          <div className="mt-5 space-y-4">
            {(leads ?? []).map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <p className="font-semibold">{lead.name} <span className="text-slate-500">at</span> {lead.company}</p>
                    <p className="mt-1 text-sm text-slate-400">{lead.email} · {lead.status}</p>
                  </div>
                  <ResearchButton leadId={lead.id} />
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {(emails ?? []).filter((email) => email.lead_id === lead.id).map((email) => (
                    <div key={email.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm">
                      <p className="font-medium text-cyan-200">{email.kind.replaceAll("_", " ")}</p>
                      {email.subject ? <p className="mt-2 text-white">{email.subject}</p> : null}
                      <p className="mt-2 line-clamp-4 whitespace-pre-wrap text-slate-400">{email.body}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">{email.status}</span>
                        {email.kind !== "linkedin_message" ? <SendEmailButton emailId={email.id} /> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {leads?.length === 0 ? <p className="text-sm text-slate-400">No leads imported yet.</p> : null}
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}
