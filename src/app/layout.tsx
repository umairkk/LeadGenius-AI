import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadGenius AI | AI lead enrichment and outreach",
  description: "Upload prospects, enrich companies, identify pain points, and generate personalized outreach with AI."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
