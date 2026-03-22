import { cacheLife, cacheTag } from "next/cache";

import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { BreakingNews } from "@/lib/types";

export async function getBreakingNews(): Promise<BreakingNews> {
  "use cache";
  cacheTag("breaking-news");
  cacheLife("seconds");

  const res = await fetch(`${BASE_URL}/breaking-news`, {
    headers: apiHeaders(),
  });
  if (!res.ok) throw new Error(`getBreakingNews failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}
