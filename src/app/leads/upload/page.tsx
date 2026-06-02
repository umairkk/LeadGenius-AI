import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card } from "@/components/ui/card";
import { UploadForm } from "@/components/upload-form";
import { requireUser } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const { user } = await requireUser();
  if (!user) redirect("/login");

  return (
    <DashboardShell>
      <p className="text-sm text-cyan-300">Lead upload</p>
      <h1 className="mt-2 text-4xl font-bold">Import prospects</h1>
      <p className="mt-3 max-w-2xl text-slate-400">Upload a CSV with Name, Email, Company, Website, and LinkedIn URL. The API validates headers, file type, file size, and stores rows under your Supabase user.</p>
      <Card className="mt-8 max-w-3xl">
        <UploadForm />
      </Card>
    </DashboardShell>
  );
}
