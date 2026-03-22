"use client";

import { useTransition } from "react";

import { LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { unsubscribeAction } from "@/app/actions/subscription";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isSubscribed: boolean;
}

export default function SubscriptionIndicator({ isSubscribed }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  if (!isSubscribed) {
    if (pathname === "/subscribe") return null;
    return (
      <Link
        href="/subscribe"
        className={cn(buttonVariants({ variant: "default" }), "px-4 py-1.5")}
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
