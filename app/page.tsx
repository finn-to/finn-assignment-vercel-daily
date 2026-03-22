import { Suspense } from "react";

import BreakingNewsBanner, {
  BreakingNewsBannerSkeleton,
} from "@/components/composite/BreakingNewsBanner";
import ErrorBoundary from "@/components/composite/ErrorBoundary";
import FeaturedArticles, {
  FeaturedArticlesSkeleton,
} from "@/components/composite/FeaturedArticles";
import HeroSection from "@/components/composite/HeroSection";

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
