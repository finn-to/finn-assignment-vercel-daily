import Image from "next/image";
import Link from "next/link";

import { getTrendingArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import { articleUrl } from "@/lib/article-helpers";
import { formatDate } from "@/lib/utils";

export { TrendingArticlesSidebarSkeleton } from "@/components/skeletons/TrendingArticlesSidebarSkeleton";

interface Props {
  currentArticleId: string;
}

export default async function TrendingArticlesSidebar({
  currentArticleId,
}: Props) {
  const [articles, categories] = await Promise.all([
    getTrendingArticles(currentArticleId),
    getCategories(),
  ]);

  const categoryNameMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );

  return (
    <aside>
      <h2 className="mb-6 text-lg font-bold text-neutral-950">Trending</h2>
      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <article key={article.id} className="flex gap-3">
            <Link
              href={articleUrl(article.slug, article.id)}
              className="group flex-shrink-0"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="80px"
                />
              </div>
            </Link>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="truncate text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {categoryNameMap[article.category] ?? article.category}
              </p>
              <Link href={articleUrl(article.slug, article.id)}>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-950 underline-offset-2 hover:underline">
                  {article.title}
                </h3>
              </Link>
              <p className="text-xs text-neutral-500">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
