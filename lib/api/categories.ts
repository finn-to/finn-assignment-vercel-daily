import { cacheLife, cacheTag } from "next/cache";

import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { Category } from "@/lib/types";

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheTag("categories");
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/categories`, { headers: apiHeaders() });
  if (!res.ok) throw new Error(`getCategories failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}
