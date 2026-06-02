"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createSupabaseBrowserClient();

    const next = searchParams.get("next") ?? "/dashboard";
    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
              emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
            }
          });

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup" && !result.data.session) {
      setMessage("Check your email to confirm your account, then return to LeadGenius AI.");
      return;
    }

    router.refresh();
    router.push(next);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === "signup" ? <Input placeholder="Full name" value={fullName} onChange={(event) => setFullName(event.target.value)} /> : null}
      <Input type="email" required placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} />
      <Input type="password" required minLength={8} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Working..." : mode === "login" ? "Log in" : "Create account"}
      </Button>
      {message ? <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">{message}</p> : null}
    </form>
  );
}
