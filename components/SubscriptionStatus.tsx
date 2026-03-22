import { cookies } from "next/headers";

import SubscriptionIndicator from "@/components/SubscriptionIndicator";
import { SUBSCRIPTION_TOKEN_COOKIE } from "@/lib/constants";

export default async function SubscriptionStatus() {
  const cookieStore = await cookies();
  const isSubscribed = !!cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;
  return <SubscriptionIndicator isSubscribed={isSubscribed} />;
}
