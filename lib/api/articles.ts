import { cacheLife, cacheTag } from "next/cache";

import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { Article, PaginationMeta } from "@/lib/types";

interface ArticleListResponse {
  data: Article[];
  meta: { pagination: PaginationMeta };
}

export async function getArticle(idOrSlug: string): Promise<Article> {
  "use cache";
  cacheTag("articles", `article-${idOrSlug}`);
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/articles/${idOrSlug}`, {
    headers: apiHeaders(),
  });
  if (!res.ok) throw new Error(`getArticle failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  "use cache";
  cacheTag("articles", "featured-articles");
  cacheLife("hours");

  const res = await fetch(`${BASE_URL}/articles?featured=true&limit=6`, {
    headers: apiHeaders(),
  });
  if (!res.ok) throw new Error(`getFeaturedArticles failed: ${res.status}`);
  const json: ArticleListResponse = await res.json();
  return json.data;
}
