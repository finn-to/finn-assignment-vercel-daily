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
        <ErrorBoundary label="Header">
          <Header />
        </ErrorBoundary>
        <ErrorBoundary label="Main">
          <main className="flex-1">{children}</main>
        </ErrorBoundary>
        <ErrorBoundary label="Footer">
          <Footer />
        </ErrorBoundary>
        <SpeedInsights />
      </body>
    </html>
  );
}
