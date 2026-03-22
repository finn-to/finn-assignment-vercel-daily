import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { BreakingNews } from "@/lib/types";

export async function getBreakingNews(): Promise<BreakingNews> {
  const res = await fetch(`${BASE_URL}/breaking-news`, {
    headers: apiHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getBreakingNews failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}
