export function articleUrl(slug: string, id: string) {
  return `/articles/${slug}-${id}`;
}

export function extractArticleId(slug: string): string {
  return slug.split("-").pop() ?? slug;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function formatDate(dateStr: string): string {
  const [year, monthStr, dayStr] = dateStr.slice(0, 10).split("-");
  const month = MONTHS[parseInt(monthStr, 10) - 1] ?? monthStr;
  return `${month} ${parseInt(dayStr, 10)}, ${year}`;
}

export function renderMarkdownInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-neutral-950"
        >
          {label}
        </a>
      );
    }
    return part;
  });
}
