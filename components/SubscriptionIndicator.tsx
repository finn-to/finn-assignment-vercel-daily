"use client";

import { useTransition } from "react";

import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { unsubscribeAction } from "@/app/actions/subscription";
import { Button } from "@/components/ui/button";

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
      <Button
        type="button"
        variant="ghost"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            await unsubscribeAction();
            router.refresh();
          })
        }
        className="h-auto gap-1 px-0 text-neutral-500 underline-offset-2 hover:bg-transparent hover:text-neutral-950 cursor-pointer"
      >
        {isPending && <LoaderCircleIcon className="h-3 w-3 animate-spin" />}
        {isPending ? "Unsubscribing..." : "Unsubscribe"}
      </Button>
    </div>
  );
}
