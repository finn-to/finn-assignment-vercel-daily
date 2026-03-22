import Link from "next/link";

import ArticleBody from "@/components/ArticleBody";
import type { ContentBlock } from "@/lib/types";

interface Props {
  teaser: ContentBlock[];
}

export default function PaywallGate({ teaser }: Props) {
  return (
    <div>
      <div className="relative">
        <div className="pointer-events-none select-none">
          <ArticleBody blocks={teaser} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white" />
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
          Members only
        </p>
        <h3 className="mb-2 text-2xl font-bold text-neutral-950">
          Continue reading with a subscription
        </h3>
        <p className="mx-auto mb-6 max-w-sm text-neutral-600">
          Get unlimited access to all articles and exclusive content from Vercel
          Daily News.
        </p>
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center rounded-lg bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          Subscribe now
        </Link>
      </div>
    </div>
  );
}
