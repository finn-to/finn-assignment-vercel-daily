"use client";

import { useFormStatus } from "react-dom";

import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SubscribeButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="w-full cursor-pointer py-6"
    >
      {pending && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
      {pending ? "Subscribing..." : "Subscribe Now"}
    </Button>
  );
}
