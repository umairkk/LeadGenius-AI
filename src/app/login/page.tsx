import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-400">Log in to manage lead research, email drafts, and campaigns.</p>
        <div className="mt-8"><Suspense fallback={<div className="text-sm text-slate-400">Loading...</div>}><AuthForm mode="login" /></Suspense></div>
        <p className="mt-6 text-sm text-slate-400">No account? <Link href="/signup" className="text-cyan-300">Create one</Link></p>
      </Card>
    </main>
  );
}
