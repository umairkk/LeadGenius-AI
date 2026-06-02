"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SendEmailButton({ emailId }: { emailId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <Button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setMessage(null);
          const response = await fetch(`/api/emails/${emailId}/send`, { method: "POST" });
          const data = await response.json();
          setLoading(false);
          setMessage(response.ok ? "Sent via Resend." : data.error ?? "Send failed");
        }}
      >
        {loading ? "Sending..." : "Send"}
      </Button>
      {message ? <p className="text-xs text-slate-400">{message}</p> : null}
    </div>
  );
}
