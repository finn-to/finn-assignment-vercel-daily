import { apiHeaders, BASE_URL } from "@/lib/constants";
import type { Subscription } from "@/lib/types";

export async function getSubscription(token: string): Promise<Subscription> {
  const res = await fetch(`${BASE_URL}/subscription`, {
    headers: { ...apiHeaders(), "x-subscription-token": token },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getSubscription failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function createSubscription(): Promise<{
  subscription: Subscription;
  token: string;
}> {
  const res = await fetch(`${BASE_URL}/subscription/create`, {
    method: "POST",
    headers: apiHeaders(),
  });
  if (!res.ok) throw new Error(`createSubscription failed: ${res.status}`);
  const token = res.headers.get("x-subscription-token") ?? "";
  const json = await res.json();
  return { subscription: json.data, token };
}

export async function activateSubscription(
  token: string,
): Promise<Subscription> {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: "POST",
    headers: { ...apiHeaders(), "x-subscription-token": token },
  });
  if (!res.ok) throw new Error(`activateSubscription failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}

export async function deactivateSubscription(
  token: string,
): Promise<Subscription> {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: "DELETE",
    headers: { ...apiHeaders(), "x-subscription-token": token },
  });
  if (!res.ok) throw new Error(`deactivateSubscription failed: ${res.status}`);
  const json = await res.json();
  return json.data;
}
