import type { ComponentType } from "react";
import ResiliationRecommandeeContent, {
  meta as resiliationRecommandeeMeta,
} from "@/content/blog/lettre-resiliation-recommandee-guide-2026";
import RuptureConventionnelleContent, {
  meta as ruptureConventionnelleMeta,
} from "@/content/blog/rupture-conventionnelle-demande-guide-2026";
import DemissionCdiContent, {
  meta as demissionCdiMeta,
} from "@/content/blog/lettre-demission-cdi-guide-2026";
import PreavisBailContent, {
  meta as preavisBailMeta,
} from "@/content/blog/preavis-bail-locataire-guide-2026";
import MiseEnDemeureContent, {
  meta as miseEnDemeureMeta,
} from "@/content/blog/mise-en-demeure-guide-2026";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
  category: string;
}

export interface BlogPost extends BlogPostMeta {
  Content: ComponentType;
}

export const posts: BlogPost[] = [
  {
    ...resiliationRecommandeeMeta,
    Content: ResiliationRecommandeeContent,
  },
  {
    ...ruptureConventionnelleMeta,
    Content: RuptureConventionnelleContent,
  },
  {
    ...demissionCdiMeta,
    Content: DemissionCdiContent,
  },
  {
    ...preavisBailMeta,
    Content: PreavisBailContent,
  },
  {
    ...miseEnDemeureMeta,
    Content: MiseEnDemeureContent,
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, limit);
}
