export interface LetterVariable {
  name: string;
  label: string;
  placeholder: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedLink {
  label: string;
  url: string;
}

export interface Letter {
  slug: string;
  category: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  context: string;
  legalBasis: string;
  sendingMethod: string;
  template: string;
  variables: LetterVariable[];
  faq: FaqItem[];
  relatedLinks: RelatedLink[];
  estimatedSearchVolume: number;
  difficulty: string;
}

// In production, these will come from JSON files or Supabase.
// For now, we use a static registry.
import resiliationMutuelle from "@/content/lettres/resiliation/resiliation-mutuelle-sante.json";
import demissionCdi from "@/content/lettres/emploi/demission-cdi.json";

const allLetters: Letter[] = [
  resiliationMutuelle as Letter,
  demissionCdi as Letter,
];

export function getLetterBySlug(
  category: string,
  slug: string
): Letter | undefined {
  return allLetters.find((l) => l.category === category && l.slug === slug);
}

export function getLettersByCategory(category: string): Letter[] {
  return allLetters.filter((l) => l.category === category);
}

export function getAllLetters(): Letter[] {
  return allLetters;
}

export function getRelatedLetters(
  currentSlug: string,
  category: string,
  max = 4
): Letter[] {
  return allLetters
    .filter((l) => l.slug !== currentSlug && l.category === category)
    .slice(0, max);
}
