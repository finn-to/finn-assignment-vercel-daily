import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import type { Category } from "@/lib/types";

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

function buildHeading(
  query: string,
  categoryName: string | undefined,
  count: number,
): string {
  if (!query && !categoryName) return "Recent Articles";

  let heading = `${count} result${count !== 1 ? "s" : ""}`;
  if (query) heading += ` for "${query}"`;
  if (categoryName) heading += ` in ${categoryName}`;
  return heading;
}

export default async function SearchResults({ searchParams }: Props) {
  const { q, category } = await searchParams;

  const query = q?.trim() || "";
  const hasSearch = !!query || !!category;

  const [{ data: articles }, categories] = await Promise.all([
    getArticles({
      search: query || undefined,
      category: (category as Category["slug"]) || undefined,
      limit: 5,
    }),
    getCategories(),
  ]);

  const categoryNameMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );

  const resolvedCategoryName = category
    ? (categoryNameMap[category] ?? category)
    : undefined;

  const heading = buildHeading(query, resolvedCategoryName, articles.length);

  return (
    <div className="mt-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-6">
        {heading}
      </p>

      {hasSearch && articles.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium text-neutral-700">
            No articles found{query ? ` for "${query}"` : ""}.
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Try a different keyword or browse all categories.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              categoryName={
                categoryNameMap[article.category] ?? article.category
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
