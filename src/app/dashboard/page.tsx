import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard, Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { formatNumber, formatPercent } from "@/lib/utils";
import { requireUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();
  if (!user) redirect("/login");

  const [{ data: leads }, { data: emails }, { data: campaigns }] = await Promise.all([
    supabase.from("leads").select("id,status").eq("user_id", user.id),
    supabase.from("emails").select("id,status").eq("user_id", user.id),
    supabase.from("campaigns").select("id,name,status,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5)
  ]);

  const totalLeads = leads?.length ?? 0;
  const generated = emails?.length ?? 0;
  const sent = emails?.filter((email) => ["sent", "opened", "replied"].includes(email.status)).length ?? 0;
  const replies = emails?.filter((email) => email.status === "replied").length ?? 0;
  const meetings = leads?.filter((lead) => lead.status === "meeting_booked").length ?? 0;

  return (
    <DashboardShell>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-300">Workspace overview</p>
          <h1 className="mt-2 text-4xl font-bold">Dashboard</h1>
        </div>
        <ButtonLink href="/leads/upload">Upload leads</ButtonLink>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Total leads" value={formatNumber(totalLeads)} />
        <MetricCard label="Emails generated" value={formatNumber(generated)} />
        <MetricCard label="Emails sent" value={formatNumber(sent)} />
        <MetricCard label="Reply rate" value={formatPercent(sent ? replies / sent : 0)} />
        <MetricCard label="Meetings booked" value={formatNumber(meetings)} />
      </div>
      <Card className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent campaigns</h2>
          <ButtonLink href="/campaigns" variant="secondary">View all</ButtonLink>
        </div>
        <div className="mt-6 divide-y divide-white/10">
          {(campaigns ?? []).map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between py-4 text-sm">
              <div>
                <p className="font-medium text-white">{campaign.name}</p>
                <p className="text-slate-500">{campaign.status}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{new Date(campaign.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          {campaigns?.length === 0 ? <p className="py-8 text-sm text-slate-400">No campaigns yet. Upload a CSV to begin.</p> : null}
        </div>
      </Card>
    </DashboardShell>
  );
}
