import { cacheLife, cacheTag } from "next/cache";

import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { PublicationConfig } from "@/lib/types";

export async function getPublicationConfig(): Promise<PublicationConfig> {
  "use cache";
  cacheTag("publication-config");
  cacheLife("max");

  const url = `${BASE_URL}/publication/config`;
  console.log(`[fetch] GET ${url}`);
  const res = await fetch(url, { headers: apiHeaders() });
  console.log(`[fetch] GET ${url} -> ${res.status}`);
  if (!res.ok) throw new Error(`getPublicationConfig failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}
