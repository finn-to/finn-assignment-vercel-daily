import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/categories";

const PAGE_SIZE = 9;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

function parsePage(raw?: string): number {
  return Math.max(1, parseInt(raw ?? "1", 10) || 1);
}

function PaginationLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const base =
    "inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-medium";

  if (disabled) {
    return (
      <span
        className={`${base} border-neutral-100 text-neutral-300 cursor-not-allowed`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} border-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-50`}
    >
      {children}
    </Link>
  );
}

export default async function ArticlesList({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = parsePage(page);

  const [{ data: articles, meta }, categories] = await Promise.all([
    getArticles({ page: currentPage, limit: PAGE_SIZE }),
    getCategories(),
  ]);

  const { pagination } = meta;
  const categoryNameMap = Object.fromEntries(
    categories.map((c) => [c.slug, c.name]),
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            categoryName={categoryNameMap[article.category] ?? article.category}
          />
        ))}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between border-t border-neutral-200 pt-6">
          <p className="text-sm text-neutral-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <PaginationLink
              href={`/articles?page=${currentPage - 1}`}
              disabled={!pagination.hasPreviousPage}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Previous
            </PaginationLink>

            <PaginationLink
              href={`/articles?page=${currentPage + 1}`}
              disabled={!pagination.hasNextPage}
            >
              Next
              <ArrowRightIcon className="h-4 w-4" />
            </PaginationLink>
          </div>
        </div>
      )}
    </div>
  );
}
