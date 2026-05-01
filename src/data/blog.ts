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
import ContesterAmendeContent, {
  meta as contesterAmendeMeta,
} from "@/content/blog/contester-amende-forfait-post-stationnement-2026";
import AssuranceHamonContent, {
  meta as assuranceHamonMeta,
} from "@/content/blog/resiliation-assurance-loi-hamon-chatel-2026";
import ReclamationContent, {
  meta as reclamationMeta,
} from "@/content/blog/reclamation-remboursement-consommation-2026";
import RetractationContent, {
  meta as retractationMeta,
} from "@/content/blog/droit-retractation-14-jours-2026";
import FaireValoirDroitsContent, {
  meta as faireValoirDroitsMeta,
} from "@/content/blog/faire-valoir-ses-droits-par-courrier-2026";
import CandidatureSpontaneeContent, {
  meta as candidatureSpontaneeMeta,
} from "@/content/blog/lettre-candidature-spontanee-guide-2026";
import DemandeAugmentationContent, {
  meta as demandeAugmentationMeta,
} from "@/content/blog/demande-augmentation-salaire-guide-2026";
import DepotGarantieContent, {
  meta as depotGarantieMeta,
} from "@/content/blog/restitution-depot-garantie-locataire-2026";
import DeclarationSinistreContent, {
  meta as declarationSinistreMeta,
} from "@/content/blog/declaration-sinistre-habitation-2026";
import LettreSyndicContent, {
  meta as lettreSyndicMeta,
} from "@/content/blog/lettre-au-syndic-copropriete-2026";

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
  {
    ...contesterAmendeMeta,
    Content: ContesterAmendeContent,
  },
  {
    ...assuranceHamonMeta,
    Content: AssuranceHamonContent,
  },
  {
    ...reclamationMeta,
    Content: ReclamationContent,
  },
  {
    ...retractationMeta,
    Content: RetractationContent,
  },
  {
    ...faireValoirDroitsMeta,
    Content: FaireValoirDroitsContent,
  },
  {
    ...candidatureSpontaneeMeta,
    Content: CandidatureSpontaneeContent,
  },
  {
    ...demandeAugmentationMeta,
    Content: DemandeAugmentationContent,
  },
  {
    ...depotGarantieMeta,
    Content: DepotGarantieContent,
  },
  {
    ...declarationSinistreMeta,
    Content: DeclarationSinistreContent,
  },
  {
    ...lettreSyndicMeta,
    Content: LettreSyndicContent,
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
