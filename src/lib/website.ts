const MAX_WEBSITE_CHARS = 12000;

export async function fetchWebsiteText(url: string | null) {
  if (!url) {
    return "No company website was supplied.";
  }

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "LeadGeniusAI/1.0 (+https://leadgenius.ai)"
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000)
    });

    if (!response.ok) {
      return `Website fetch failed with HTTP ${response.status}.`;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      return `Website returned unsupported content type: ${contentType}.`;
    }

    const html = await response.text();
    return stripHtml(html).slice(0, MAX_WEBSITE_CHARS);
  } catch (error) {
    return `Website fetch failed: ${error instanceof Error ? error.message : "unknown error"}.`;
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
