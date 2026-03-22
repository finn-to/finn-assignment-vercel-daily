import { Suspense } from "react";

import type { Metadata } from "next";

import ArticlesList from "@/components/composite/ArticlesList";
import ErrorBoundary from "@/components/composite/ErrorBoundary";
import { ArticlesListSkeleton } from "@/components/skeletons/ArticlesListSkeleton";

export const metadata: Metadata = {
  title: "Articles",
  description: "Browse all articles from Vercel Daily.",
  openGraph: {
    title: "Articles",
    description: "Browse all articles from Vercel Daily.",
    type: "website",
  },
};

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default function ArticlesPage({ searchParams }: Props) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-950">All Articles</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Browse the latest stories from our team.
        </p>
      </div>

      <ErrorBoundary label="ArticlesList">
        <Suspense fallback={<ArticlesListSkeleton />}>
          <ArticlesList searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
