"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UploadForm() {
  const [campaignName, setCampaignName] = useState("Q3 outbound campaign");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setMessage("Choose a CSV file first.");
      return;
    }

    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.set("campaignName", campaignName);
    formData.set("file", file);

    const response = await fetch("/api/leads/upload", { method: "POST", body: formData });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? `Imported ${data.imported} leads into ${data.campaign.name}.` : data.error ?? "Upload failed");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm font-medium text-slate-300">
        Campaign name
        <Input className="mt-2" value={campaignName} onChange={(event) => setCampaignName(event.target.value)} required />
      </label>
      <label className="block rounded-3xl border border-dashed border-cyan-300/40 bg-cyan-300/5 p-8 text-center text-sm text-slate-300">
        <span className="block text-lg font-semibold text-white">Upload prospect CSV</span>
        <span className="mt-2 block">Required headers: Name, Email, Company, Website, LinkedIn URL</span>
        <input className="mt-5" type="file" accept=".csv,text/csv" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      </label>
      <Button disabled={loading}>{loading ? "Uploading..." : "Import leads"}</Button>
      {message ? <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{message}</p> : null}
    </form>
  );
}
