import { cacheLife, cacheTag } from "next/cache";

import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { Article, ListArticlesParams, PaginationMeta } from "@/lib/types";

export interface ArticleListResponse {
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

export async function getArticles(
  params?: ListArticlesParams,
): Promise<ArticleListResponse> {
  "use cache";
  cacheTag("articles");
  cacheLife("hours");

  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  if (params?.category) qs.set("category", params.category);
  if (params?.search) qs.set("search", params.search);
  if (params?.featured !== undefined)
    qs.set("featured", String(params.featured));

  const res = await fetch(
    `${BASE_URL}/articles${qs.toString() ? `?${qs}` : ""}`,
    { headers: apiHeaders() },
  );
  if (!res.ok) throw new Error(`getArticles failed: ${res.status}`);
  return res.json();
}

export async function getTrendingArticles(
  exclude?: string,
): Promise<Article[]> {
  const url = exclude
    ? `${BASE_URL}/articles/trending?exclude=${encodeURIComponent(exclude)}`
    : `${BASE_URL}/articles/trending`;

  const res = await fetch(url, {
    headers: apiHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getTrendingArticles failed: ${res.status}`);
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
