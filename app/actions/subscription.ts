"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  activateSubscription,
  createSubscription,
  deactivateSubscription,
} from "@/lib/api/subscription";
import { SUBSCRIPTION_TOKEN_COOKIE } from "@/lib/constants";

export async function subscribeAction(formData: FormData) {
  const { token } = await createSubscription();
  await activateSubscription(token);

  const cookieStore = await cookies();
  cookieStore.set(SUBSCRIPTION_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  const redirectTo = formData.get("redirect");
  redirect(typeof redirectTo === "string" && redirectTo ? redirectTo : "/");
}

export async function unsubscribeAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SUBSCRIPTION_TOKEN_COOKIE)?.value;

  if (token) {
    try {
      await deactivateSubscription(token);
    } catch {}
    cookieStore.delete(SUBSCRIPTION_TOKEN_COOKIE);
  }
}
