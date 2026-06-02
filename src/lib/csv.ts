import Papa from "papaparse";
import { z } from "zod";
import { leadCsvRowSchema, type LeadCsvRow } from "@/lib/validation";

const headerMap: Record<string, keyof LeadCsvRow> = {
  name: "name",
  full_name: "name",
  fullname: "name",
  email: "email",
  email_address: "email",
  company: "company",
  company_name: "company",
  website: "website",
  url: "website",
  linkedin: "linkedin_url",
  linkedin_url: "linkedin_url",
  linkedinurl: "linkedin_url"
};

function normalizeHeader(header: string) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export function parseLeadCsv(csvText: string) {
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => headerMap[normalizeHeader(header)] ?? normalizeHeader(header)
  });

  if (parsed.errors.length > 0) {
    throw new Error(parsed.errors.map((error) => error.message).join(", "));
  }

  const rows: LeadCsvRow[] = [];
  const errors: string[] = [];

  parsed.data.forEach((row, index) => {
    const result = leadCsvRowSchema.safeParse({
      name: row.name,
      email: row.email,
      company: row.company,
      website: row.website,
      linkedin_url: row.linkedin_url
    });

    if (result.success) {
      rows.push(result.data);
      return;
    }

    errors.push(`Row ${index + 2}: ${z.prettifyError(result.error)}`);
  });

  if (errors.length > 0) {
    throw new Error(errors.slice(0, 10).join("\n"));
  }

  return rows;
}
