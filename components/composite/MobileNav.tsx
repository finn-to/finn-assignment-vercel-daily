"use client";

import { type ReactNode } from "react";

import { MenuIcon } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";

interface Props {
  subscriptionSlot?: ReactNode;
}

export default function MobileNav({ subscriptionSlot }: Props) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
        <MenuIcon className="h-5 w-5" />
        <span className="sr-only">Open navigation</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader className="mb-2">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2">
          {NAV_LINKS.map(({ href, label }) => (
            <SheetClose
              key={href}
              nativeButton={false}
              render={
                <Link
                  href={href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                />
              }
            >
              {label}
            </SheetClose>
          ))}
        </nav>
        {subscriptionSlot && (
          <div className="mt-4 border-t border-neutral-100 px-4 pt-4">
            {subscriptionSlot}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
