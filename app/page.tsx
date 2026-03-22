import { Suspense } from "react";

import BreakingNewsBanner, {
  BreakingNewsBannerSkeleton,
} from "@/components/BreakingNewsBanner";
import ErrorBoundary from "@/components/ErrorBoundary";
import FeaturedArticles, {
  FeaturedArticlesSkeleton,
} from "@/components/FeaturedArticles";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <ErrorBoundary label="BreakingNewsBanner">
        <Suspense fallback={<BreakingNewsBannerSkeleton />}>
          <BreakingNewsBanner />
        </Suspense>
      </ErrorBoundary>
      <HeroSection />
      <ErrorBoundary label="FeaturedArticles">
        <Suspense fallback={<FeaturedArticlesSkeleton />}>
          <FeaturedArticles />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
