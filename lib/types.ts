export interface Author {
  name: string;
  avatar: string;
}

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "blockquote"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentBlock[];
  category: string;
  author: Author;
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

export interface Category {
  slug:
    | "changelog"
    | "engineering"
    | "customers"
    | "company-news"
    | "community";
  name: string;
  articleCount: number;
}

export interface BreakingNews {
  id: string;
  headline: string;
  summary: string;
  articleId: string;
  category: string;
  publishedAt: string;
  urgent: boolean;
}

export interface Subscription {
  token: string;
  status: "active" | "inactive";
  subscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ListArticlesParams {
  page?: number;
  limit?: number;
  category?: Category["slug"];
  search?: string;
  featured?: boolean;
}

export interface PublicationFeatures {
  newsletter: boolean;
  bookmarks: boolean;
  comments: boolean;
  darkMode: boolean;
  searchSuggestions: boolean;
}

export interface PublicationSocialLinks {
  twitter: string;
  github: string;
  discord: string;
}

export interface PublicationSeo {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
}

export interface PublicationConfig {
  publicationName: string;
  language: string;
  features: PublicationFeatures;
  socialLinks: PublicationSocialLinks;
  seo: PublicationSeo;
}
