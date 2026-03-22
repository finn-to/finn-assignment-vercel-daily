import { Suspense } from "react";

import type { Metadata } from "next";

import ErrorBoundary from "@/components/composite/ErrorBoundary";
import SearchControls, {
  SearchControlsSkeleton,
} from "@/components/composite/SearchControls";
import SearchResults from "@/components/composite/SearchResults";
import { SearchResultsSkeleton } from "@/components/skeletons/SearchResultsSkeleton";

export const metadata: Metadata = {
  title: "Search Articles",
  description: "Search and filter articles by keyword or category.",
  openGraph: {
    title: "Search Articles",
    description: "Search and filter articles by keyword or category.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Search Articles",
    description: "Search and filter articles by keyword or category.",
  },
};

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default function SearchPage({ searchParams }: Props) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-950 mb-2">
        Search Articles
      </h1>
      <p className="text-sm text-neutral-500 mb-8">
        Find articles by keyword or category.
      </p>

      <Suspense fallback={<SearchControlsSkeleton />}>
        <SearchControls />
      </Suspense>

      <ErrorBoundary label="SearchResults">
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
