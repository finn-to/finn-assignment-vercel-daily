export const BASE_URL =
  process.env.BASE_URL ?? "https://vercel-daily-news-api.vercel.app/api";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://finn-assignment-vercel-daily.vercel.app/";

export const BYPASS_TOKEN =
  process.env.API_BYPASS_TOKEN ?? "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q";

export const SUBSCRIPTION_TOKEN_COOKIE = "subscription_token";

export function apiHeaders(): HeadersInit {
  return { "x-vercel-protection-bypass": BYPASS_TOKEN };
}
