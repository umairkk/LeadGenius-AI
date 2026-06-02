import Link from "next/link";
import { ReactNode } from "react";
import { BarChart3, Mail, Settings, UploadCloud, Users } from "lucide-react";
import { SignOutButton } from "@/components/sign-out-button";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/leads/upload", label: "Upload Leads", icon: UploadCloud },
  { href: "/campaigns", label: "Campaigns", icon: Mail },
  { href: "/settings", label: "Plans", icon: Settings }
];

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-950/95 p-6 lg:block">
        <Link href="/dashboard" className="flex items-center gap-3 text-xl font-bold">
          <span className="rounded-2xl bg-cyan-400 p-2 text-slate-950"><Users size={22} /></span>
          LeadGenius AI
        </Link>
        <nav className="mt-10 space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <SignOutButton />
        </div>
      </aside>
      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</div>
      </main>
    </div>
  );
}
