import { TriangleIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <TriangleIcon className="h-4 w-4 fill-current" />
            <span>Vercel Daily</span>
          </Link>
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Vercel Daily. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
