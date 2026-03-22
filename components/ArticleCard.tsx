import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/lib/types";
import { articleUrl, formatDate } from "@/lib/article-helpers";

interface Props {
  article: Article;
  categoryName: string;
}

export default function ArticleCard({ article, categoryName }: Props) {
  const href = articleUrl(article.slug, article.id);
  return (
    <article className="flex flex-col gap-4">
      <Link href={href} className="block group">
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 aspect-[3/2] relative">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          {categoryName}
          <span className="mx-2 font-normal">·</span>
          {formatDate(article.publishedAt)}
        </p>

        <Link href={href}>
          <h3 className="text-lg font-semibold leading-snug text-neutral-950 hover:underline underline-offset-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-neutral-600 line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
