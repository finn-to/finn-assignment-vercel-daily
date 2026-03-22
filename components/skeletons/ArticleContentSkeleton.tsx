import { Skeleton } from "@/components/ui/skeleton";

export function ArticleContentSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i % 3 === 2 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}
