import { ArrowRight, Brain, FileSpreadsheet, MailCheck, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  { icon: FileSpreadsheet, title: "CSV lead import", text: "Map prospects with name, email, company, website, and LinkedIn URL directly into Supabase." },
  { icon: Brain, title: "AI research engine", text: "Analyze websites, infer industry, company size, products, pain points, goals, and outreach angles." },
  { icon: MailCheck, title: "Human outreach drafts", text: "Generate cold emails, two follow-ups, and LinkedIn messages grounded in company context." },
  { icon: ShieldCheck, title: "Secure by design", text: "Row-level security, per-user data isolation, rate limits, and authenticated API workflows." }
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative mx-auto flex max-w-7xl flex-col px-5 py-8 sm:px-8 lg:min-h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_30%)]" />
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">LeadGenius AI</div>
          <div className="flex items-center gap-3">
            <ButtonLink href="/login" variant="ghost">Log in</ButtonLink>
            <ButtonLink href="/signup">Start free</ButtonLink>
          </div>
        </nav>
        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">AI-powered B2B prospect research</p>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">Turn raw lead lists into researched, personalized outreach.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Upload a CSV of prospects. LeadGenius AI enriches each company, finds likely pain points, and drafts concise sales emails that sound like a real person wrote them.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="gap-2">Build my campaign <ArrowRight size={16} /></ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary">View dashboard</ButtonLink>
            </div>
          </div>
          <Card className="bg-slate-900/80">
            <div className="rounded-2xl border border-white/10 bg-slate-950 p-4">
              <p className="text-sm text-slate-400">Generated angle</p>
              <p className="mt-3 text-xl font-semibold">Help Acme reduce manual lead qualification while scaling outbound.</p>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <p><span className="text-cyan-300">Industry:</span> B2B SaaS</p>
              <p><span className="text-cyan-300">Pain point:</span> Small sales team managing many mid-market prospects.</p>
              <p><span className="text-cyan-300">CTA:</span> Open to comparing notes for 15 minutes next week?</p>
            </div>
          </Card>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-5 px-5 pb-20 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <Icon className="text-cyan-300" />
              <h2 className="mt-5 text-lg font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{feature.text}</p>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
