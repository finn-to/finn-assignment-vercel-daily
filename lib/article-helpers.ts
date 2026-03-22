export function articleUrl(slug: string, id: string) {
  return `/articles/${slug}-${id}`;
}

export function extractArticleId(slug: string): string {
  return slug.split("-").pop() ?? slug;
}
