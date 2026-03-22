import { BellIcon, TriangleIcon } from "lucide-react";
import Link from "next/link";

import MobileNav from "@/components/MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center gap-4">
          <MobileNav />

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <TriangleIcon className="h-4 w-4 fill-current" />
            <span>Vercel Daily</span>
          </Link>

          <nav className="ml-2 hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          <button
            type="button"
            aria-label="Notifications"
            className="rounded-md p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
          >
            <BellIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
