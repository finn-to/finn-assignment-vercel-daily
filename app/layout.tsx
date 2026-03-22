import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import ErrorBoundary from "@/components/composite/ErrorBoundary";
import Footer from "@/components/composite/Footer";
import Header from "@/components/composite/Header";
import { getPublicationConfig } from "@/lib/api/publicationConfig";
import { SITE_URL } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
};

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPublicationConfig();
  const { defaultTitle, titleTemplate, defaultDescription } = config.seo;

  return {
    generator: "vercel-daily-news",
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description: defaultDescription,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      type: "website",
      siteName: config.publicationName,
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-900 focus:shadow-md focus:ring-2 focus:ring-neutral-900 focus:outline-none"
        >
          Skip to main content
        </a>
        <ErrorBoundary label="Header">
          <Header />
        </ErrorBoundary>
        <ErrorBoundary label="Main">
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </ErrorBoundary>
        <ErrorBoundary label="Footer">
          <Footer />
        </ErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  );
}
