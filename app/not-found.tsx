import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-neutral-900">
        Page not found
      </h1>
      <p className="mt-4 text-base text-neutral-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 text-sm font-semibold text-neutral-900 underline underline-offset-4 hover:text-neutral-600"
      >
        Back to home
      </Link>
    </div>
  );
}
