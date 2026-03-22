import type { BreakingNews } from "@/lib/types";

export default function BreakingNewsBanner({ item }: { item: BreakingNews }) {
  return <div>BreakingNewsBanner: {item.headline}</div>;
}
