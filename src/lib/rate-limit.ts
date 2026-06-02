import { NextRequest } from "next/server";
import { getServerEnv } from "@/lib/env";

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1"
  );
}

export function rateLimit(request: NextRequest, scope: string) {
  const env = getServerEnv();
  const now = Date.now();
  const key = `${scope}:${getClientIp(request)}`;
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + env.APP_RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: env.APP_RATE_LIMIT_MAX - 1 };
  }

  if (bucket.count >= env.APP_RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return { allowed: true, remaining: env.APP_RATE_LIMIT_MAX - bucket.count };
}
