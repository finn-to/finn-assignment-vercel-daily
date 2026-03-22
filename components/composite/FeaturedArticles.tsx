import Link from "next/link";

import ArticleCard from "@/components/composite/ArticleCard";
import { getFeaturedArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";

export { FeaturedArticlesSkeleton } from "@/components/skeletons/FeaturedArticlesSkeleton";

export default async function FeaturedArticles() {
  const [articles, categories] = await Promise.all([
    getFeaturedArticles(),
    getCategories(),
  ]);

  const categoryNameMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-950">Featured</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Handpicked stories from the team.
          </p>
        </div>
        <Link
          href="/articles"
          className="rounded-md text-sm text-neutral-500 hover:text-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            categoryName={categoryNameMap[article.category] ?? article.category}
          />
        ))}
      </div>
    </section>
  );
}
