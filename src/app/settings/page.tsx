import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/supabase/server";

const plans = [
  { name: "Starter", price: "$49", detail: "1,000 leads/mo", features: ["CSV upload", "AI enrichment", "Email drafts"] },
  { name: "Growth", price: "$149", detail: "10,000 leads/mo", features: ["Campaign analytics", "Resend sending", "Reply classification"] },
  { name: "Scale", price: "$399", detail: "50,000 leads/mo", features: ["Priority queues", "Team workspaces", "Advanced reporting"] }
];

export default async function SettingsPage() {
  const { user } = await requireUser();
  if (!user) redirect("/login");

  return (
    <DashboardShell>
      <p className="text-sm text-cyan-300">Subscription plans</p>
      <h1 className="mt-2 text-4xl font-bold">Choose a plan</h1>
      <p className="mt-3 max-w-2xl text-slate-400">Plans are modeled in the users table and ready to connect to a billing provider such as Stripe.</p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-5 text-4xl font-bold">{plan.price}<span className="text-base font-normal text-slate-500">/mo</span></p>
            <p className="mt-2 text-sm text-slate-400">{plan.detail}</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
              {plan.features.map((feature) => <li key={feature}>· {feature}</li>)}
            </ul>
            <Button className="mt-8" variant={plan.name === "Growth" ? "primary" : "secondary"}>Select {plan.name}</Button>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}
