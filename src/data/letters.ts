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
  /** Lucide icon name (e.g. "Heart", "Wifi", "Car"). Defaults to "FileText". */
  icon?: string;
}

// Icon registry — maps slug to Lucide icon name
export const letterIcons: Record<string, string> = {
  "mutuelle-sante": "Heart",
  "box-internet": "Wifi",
  "assurance-auto": "Car",
  "forfait-mobile": "Smartphone",
  "assurance-habitation": "Home",
  "salle-de-sport": "Dumbbell",
  "abonnement-presse": "Newspaper",
  "assurance-emprunteur": "Landmark",
  "compte-bancaire": "CreditCard",
  "credit-consommation": "PiggyBank",
  "demission-cdi": "Briefcase",
};

// === RÉSILIATION ===
import resiliationMutuelle from "@/content/lettres/resiliation/resiliation-mutuelle-sante.json";
import boxInternet from "@/content/lettres/resiliation/box-internet.json";
import assuranceAuto from "@/content/lettres/resiliation/assurance-auto.json";
import forfaitMobile from "@/content/lettres/resiliation/forfait-mobile.json";
import assuranceHabitation from "@/content/lettres/resiliation/assurance-habitation.json";
import salleDeSport from "@/content/lettres/resiliation/salle-de-sport.json";
import abonnementPresse from "@/content/lettres/resiliation/abonnement-presse.json";
import assuranceEmprunteur from "@/content/lettres/resiliation/assurance-emprunteur.json";
import compteBancaire from "@/content/lettres/resiliation/compte-bancaire.json";
import creditConsommation from "@/content/lettres/resiliation/credit-consommation.json";

// === EMPLOI ===
import demissionCdi from "@/content/lettres/emploi/demission-cdi.json";

const allLetters: Letter[] = [
  // Résiliation
  resiliationMutuelle as Letter,
  boxInternet as Letter,
  assuranceAuto as Letter,
  forfaitMobile as Letter,
  assuranceHabitation as Letter,
  salleDeSport as Letter,
  abonnementPresse as Letter,
  assuranceEmprunteur as Letter,
  compteBancaire as Letter,
  creditConsommation as Letter,
  // Emploi
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
