import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { getArticle } from "@/lib/api/articles";
import { getBreakingNews } from "@/lib/api/breakingNews";
import { getCategories } from "@/lib/api/categories";
import { articleUrl } from "@/lib/utils";

export { BreakingNewsBannerSkeleton } from "@/components/skeletons/BreakingNewsBannerSkeleton";

export default async function BreakingNewsBanner() {
  const [item, categories] = await Promise.all([
    getBreakingNews(),
    getCategories(),
  ]);
  const categoryName =
    categories.find((c) => c.slug === item.category)?.name ?? item.category;
  const article = await getArticle(item.articleId);
  const href = articleUrl(article.slug, article.id);
  return (
    <div className="border-b border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="flex items-center gap-2 shrink-0">
            {item.urgent && (
              <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Breaking
              </span>
            )}
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {categoryName}
            </span>
          </div>
          <p className="text-sm text-neutral-200 line-clamp-1 min-w-0 flex-1">
            {item.headline}
          </p>
          <Link
            href={href}
            className="flex shrink-0 items-center gap-1 text-xs font-semibold text-white underline-offset-2 hover:underline"
          >
            Read more
            <ArrowRightIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
