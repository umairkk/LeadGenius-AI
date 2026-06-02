import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold">Create your workspace</h1>
        <p className="mt-2 text-sm text-slate-400">Start with CSV upload, Supabase-backed lead storage, and AI outreach generation.</p>
        <div className="mt-8"><Suspense fallback={<div className="text-sm text-slate-400">Loading...</div>}><AuthForm mode="signup" /></Suspense></div>
        <p className="mt-6 text-sm text-slate-400">Already have an account? <Link href="/login" className="text-cyan-300">Log in</Link></p>
      </Card>
    </main>
  );
}
