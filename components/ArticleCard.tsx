import type { Article } from "@/lib/types";

export default function ArticleCard({ article }: { article: Article }) {
  return <div>ArticleCard: {article.title}</div>;
}
