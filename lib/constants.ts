export const BASE_URL =
  process.env.BASE_URL ?? "https://vercel-daily-news-api.vercel.app/api";

export const BYPASS_TOKEN =
  process.env.API_BYPASS_TOKEN ?? "OykROcuULI6YJwAwk3VnWv4gMMbpAq6q";

export function apiHeaders(): HeadersInit {
  return { "x-vercel-protection-bypass": BYPASS_TOKEN };
}
