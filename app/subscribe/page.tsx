import { Suspense } from "react";

import { TriangleIcon } from "lucide-react";
import { cookies } from "next/headers";

import { subscribeAction } from "@/app/actions/subscription";
import SubscribeButton from "@/components/composite/SubscribeButton";
import { SUBSCRIPTION_TOKEN_COOKIE } from "@/lib/constants";

export const metadata = {
  title: "Subscribe",
  description: "Get unlimited access to all articles from Vercel Daily News.",
};

async function SubscribeForm({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const cookieStore = await cookies();
  const isSubscribed = !!cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;

  if (isSubscribed) {
    return (
      <span className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700">
        You are already subscribed
      </span>
    );
  }

  const { redirect: redirectTo } = await searchParams;
  return (
    <form action={subscribeAction}>
      {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}
      <SubscribeButton />
    </form>
  );
}

export default function SubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <div className="mb-6 flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-white">
          <TriangleIcon className="h-6 w-6 fill-current" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-neutral-950">
        Subscribe to Vercel Daily News
      </h1>
      <p className="mt-3 text-neutral-600">
        Get unlimited access to all articles and exclusive content from Vercel
        Daily News.
      </p>

      <div className="mt-4 px-4 py-4">
        <Suspense
          fallback={
            <form action={subscribeAction}>
              <SubscribeButton />
            </form>
          }
        >
          <SubscribeForm searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
