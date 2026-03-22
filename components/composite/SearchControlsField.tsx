"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/lib/types";
import { useDebounce } from "@uidotdev/usehooks";

interface Props {
  categories: Category[];
}

const DEBOUNCE_DELAY = 400;

function buildUrl(q: string, category: string) {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q.trim());
  if (category) params.set("category", category);
  return `/search${params.toString() ? `?${params}` : ""}`;
}

export default function SearchControlsField({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");
  const debouncedInput = useDebounce(inputValue, DEBOUNCE_DELAY);
  const isFirstRender = useRef(true);
  const currentCategory = searchParams.get("category") ?? "";

  const categoryRef = useRef(currentCategory);

  useEffect(() => {
    categoryRef.current = currentCategory;
  }, [currentCategory]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      debouncedInput.trim().length >= 3 ||
      debouncedInput.trim().length === 0
    ) {
      startTransition(() => {
        router.replace(buildUrl(debouncedInput, categoryRef.current));
      });
    }
  }, [debouncedInput, router, startTransition]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      startTransition(() => {
        router.replace(buildUrl(inputValue, categoryRef.current));
      });
    }
  }

  function handleCategoryChange(value: string | null) {
    startTransition(() => {
      router.replace(buildUrl(inputValue, value ?? ""));
    });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-8">
      <div className="relative flex-1">
        <Input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search articles..."
          disabled={isPending}
          aria-label="Search articles"
          className="pr-10"
        />
        {isPending && (
          <div
            aria-hidden="true"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-700" />
          </div>
        )}
      </div>

      <Select
        value={currentCategory}
        onValueChange={handleCategoryChange}
        disabled={isPending}
      >
        <SelectTrigger
          aria-label="Filter by category"
          className="sm:w-48 w-full"
        >
          <SelectValue placeholder="All categories">
            {currentCategory
              ? (categories.find((c) => c.slug === currentCategory)?.name ??
                currentCategory)
              : "All categories"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.slug} value={cat.slug}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
