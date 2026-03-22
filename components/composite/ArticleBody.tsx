import Image from "next/image";

import type { ContentBlock } from "@/lib/types";

function renderMarkdownInline(text: string) {
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

export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            if (!block.text) return null;
            return (
              <p key={i} className="text-base leading-relaxed text-neutral-700">
                {renderMarkdownInline(block.text)}
              </p>
            );
          case "heading":
            if (!block.text) return null;
            return block.level === 2 ? (
              <h2 key={i} className="mt-10 text-2xl font-bold text-neutral-950">
                {renderMarkdownInline(block.text)}
              </h2>
            ) : (
              <h3
                key={i}
                className="mt-8 text-xl font-semibold text-neutral-950"
              >
                {renderMarkdownInline(block.text)}
              </h3>
            );
          case "blockquote":
            if (!block.text) return null;
            return (
              <blockquote
                key={i}
                className="my-6 border-l-4 border-neutral-300 py-1 pl-5 italic text-neutral-600"
              >
                {renderMarkdownInline(block.text)}
              </blockquote>
            );
          case "unordered-list": {
            const ulItems = block.items?.filter(Boolean);
            if (!ulItems?.length) return null;
            return (
              <ul
                key={i}
                className="my-4 list-outside list-disc space-y-2 pl-6 text-neutral-700"
              >
                {ulItems.map((item, j) => (
                  <li key={j}>{renderMarkdownInline(item)}</li>
                ))}
              </ul>
            );
          }
          case "ordered-list": {
            const olItems = block.items?.filter(Boolean);
            if (!olItems?.length) return null;
            return (
              <ol
                key={i}
                className="my-4 list-outside list-decimal space-y-2 pl-6 text-neutral-700"
              >
                {olItems.map((item, j) => (
                  <li key={j}>{renderMarkdownInline(item)}</li>
                ))}
              </ol>
            );
          }
          case "image":
            if (!block.src) return null;
            return (
              <figure key={i} className="my-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <Image
                    src={block.src}
                    alt={block.alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-neutral-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
