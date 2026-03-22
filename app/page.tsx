import { Suspense } from "react";

import BreakingNewsBanner, {
  BreakingNewsBannerSkeleton,
} from "@/components/BreakingNewsBanner";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<BreakingNewsBannerSkeleton />}>
        <BreakingNewsBanner />
      </Suspense>
      <HeroSection />
    </div>
  );
}
