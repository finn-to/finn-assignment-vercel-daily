"use client";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-400">
          The Vercel Daily
        </p>

        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
          News and insights for modern web developers.
        </h1>

        <p className="mt-5 max-w-2xl text-base text-neutral-500 sm:text-lg">
          Changelogs, engineering deep dives, customer stories, and community
          updates - all in one place.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/search"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 gap-2 rounded-xl px-5 text-sm font-semibold",
            )}
          >
            Browse articles
            <ArrowRightIcon className="h-4 w-4" />
          </Link>

          <Link
            href="/subscribe"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-xl px-5 text-sm font-semibold",
            )}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </section>
  );
}
