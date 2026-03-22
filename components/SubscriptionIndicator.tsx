"use client";

import { useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { unsubscribeAction } from "@/app/actions/subscription";

interface Props {
  isSubscribed: boolean;
}

export default function SubscriptionIndicator({ isSubscribed }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!isSubscribed) {
    return (
      <Link
        href="/subscribe"
        className="rounded-lg bg-neutral-950 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
      >
        Subscribe
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
        Subscribed
      </span>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await unsubscribeAction();
            router.refresh();
          })
        }
        className="text-sm text-neutral-500 underline-offset-2 transition-colors hover:text-neutral-950 hover:underline disabled:opacity-50"
      >
        {isPending ? "..." : "Unsubscribe"}
      </button>
    </div>
  );
}
