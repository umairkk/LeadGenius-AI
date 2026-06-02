"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ResearchButton({ leadId }: { leadId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <Button
        variant="secondary"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setMessage(null);
          const response = await fetch(`/api/leads/${leadId}/research`, { method: "POST" });
          const data = await response.json();
          setLoading(false);
          setMessage(response.ok ? "Research and email drafts generated." : data.error ?? "Research failed");
        }}
      >
        {loading ? "Researching..." : "Research + generate emails"}
      </Button>
      {message ? <p className="text-xs text-slate-400">{message}</p> : null}
    </div>
  );
}
