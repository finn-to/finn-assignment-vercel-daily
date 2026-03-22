"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import logger from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logger.error(
      {
        errorName: error.name,
        errorMessage: error.message,
        digest: error.digest,
        stack: error.stack,
      },
      "Unhandled page error caught by error boundary",
    );
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
        500
      </p>
      <h1 className="mt-4 text-3xl font-bold text-neutral-900">
        Something went wrong
      </h1>
      <p className="mt-4 text-base text-neutral-500">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset} className="mt-10 cursor-pointer">
        Try again
      </Button>
    </div>
  );
}
