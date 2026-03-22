import { Suspense } from "react";

import { UserIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import ArticleContent from "@/components/composite/ArticleContent";
import ErrorBoundary from "@/components/composite/ErrorBoundary";
import TrendingArticlesSidebar, {
  TrendingArticlesSidebarSkeleton,
} from "@/components/composite/TrendingArticlesSidebar";
import { ArticleContentSkeleton } from "@/components/skeletons/ArticleContentSkeleton";
import { getArticle, getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";
import { extractArticleId } from "@/lib/article-helpers";
import logger from "@/lib/logger";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams() {
  try {
    const { data } = await getArticles({ limit: 100 });
    return data.map((article) => ({ slug: `${article.slug}-${article.id}` }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticle(extractArticleId(slug));
    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: "article",
        publishedTime: article.publishedAt,
        authors: [article.author.name],
        images: [
          { url: article.image, width: 1200, height: 630, alt: article.title },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: [article.image],
      },
    };
  } catch {
    return { title: "Article Not Found" };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const id = extractArticleId(slug);

  const [article, categories] = await Promise.all([
    getArticle(id).catch((err) => {
      logger.error({ err, id }, "Failed to fetch article");
      notFound();
    }),
    getCategories().catch(() => []),
  ]);

  const categoryNameMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );
  const categoryName = categoryNameMap[article.category] ?? article.category;
  const teaserBlocks = article.content.slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          {categoryName}
          <span className="mx-2 font-normal">·</span>
          {formatDate(article.publishedAt)}
        </p>
        <h1 className="text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-600">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <UserIcon className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-neutral-700">
            {article.author.name}
          </span>
        </div>

        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="min-w-0 flex-1">
          <ErrorBoundary label="ArticleContent">
            <Suspense fallback={<ArticleContentSkeleton />}>
              <ArticleContent
                content={article.content}
                teaser={teaserBlocks}
                redirectTo={`/articles/${slug}`}
              />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="w-full lg:w-72 lg:flex-shrink-0">
          <ErrorBoundary label="TrendingArticlesSidebar">
            <Suspense fallback={<TrendingArticlesSidebarSkeleton />}>
              <TrendingArticlesSidebar currentArticleId={article.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
