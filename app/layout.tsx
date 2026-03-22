import "./globals.css";

import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteDescription =
  "The latest news, tutorials, and insights for modern web developers.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vercel-daily-news.vercel.app"),
  title: {
    default: "Vercel Daily",
    template: "%s | Vercel Daily",
  },
  description: siteDescription,
  openGraph: {
    title: "Vercel Daily",
    description: siteDescription,
    type: "website",
    siteName: "Vercel Daily",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel Daily",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
