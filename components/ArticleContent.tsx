import { cookies } from "next/headers";

import ArticleBody from "@/components/ArticleBody";
import PaywallGate from "@/components/PaywallGate";
import { getSubscription } from "@/lib/api/subscription";
import { SUBSCRIPTION_TOKEN_COOKIE } from "@/lib/constants";
import type { ContentBlock } from "@/lib/types";

interface Props {
  content: ContentBlock[];
  teaser: ContentBlock[];
}

export default async function ArticleContent({ content, teaser }: Props) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;

  let isSubscribed = false;
  if (token) {
    try {
      const sub = await getSubscription(token);
      isSubscribed = sub.status === "active";
    } catch {}
  }

  return (
    <>
      {isSubscribed ? (
        <ArticleBody blocks={content} />
      ) : (
        <PaywallGate teaser={teaser} />
      )}
    </>
  );
}
