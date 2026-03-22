"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
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
      <button
        onClick={reset}
        className="mt-10 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
      >
        Try again
      </button>
    </div>
  );
}
