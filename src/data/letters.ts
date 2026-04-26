export interface LetterVariable {
  name: string;
  label: string;
  placeholder: string;
  /** Si défini, override l'auto-detection des champs requis */
  required?: boolean;
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
  // Résiliation
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
  // Emploi
  "demission-cdi": "Briefcase",
  "rupture-conventionnelle": "Handshake",
  "lettre-motivation": "FileEdit",
  "candidature-spontanee": "Send",
  "demande-augmentation": "TrendingUp",
  "conge-parental": "Baby",
  "conge-sans-solde": "CalendarOff",
  // Immobilier
  "preavis-1-mois": "DoorOpen",
  "preavis-3-mois": "DoorClosed",
  "restitution-caution": "Wallet",
  "contestation-charges": "Receipt",
  "demande-travaux-proprietaire": "Wrench",
  "contestation-etat-des-lieux": "ClipboardCheck",
  "demande-logement-social": "Building2",
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
import ruptureConventionnelle from "@/content/lettres/emploi/rupture-conventionnelle.json";
import lettreMotivation from "@/content/lettres/emploi/lettre-motivation.json";
import candidatureSpontanee from "@/content/lettres/emploi/candidature-spontanee.json";
import demandeAugmentation from "@/content/lettres/emploi/demande-augmentation.json";
import congeParental from "@/content/lettres/emploi/conge-parental.json";
import congeSansSolde from "@/content/lettres/emploi/conge-sans-solde.json";

// === IMMOBILIER ===
import preavis1Mois from "@/content/lettres/immobilier/preavis-1-mois.json";
import preavis3Mois from "@/content/lettres/immobilier/preavis-3-mois.json";
import restitutionCaution from "@/content/lettres/immobilier/restitution-caution.json";
import contestationCharges from "@/content/lettres/immobilier/contestation-charges.json";
import demandeTravauxProprietaire from "@/content/lettres/immobilier/demande-travaux-proprietaire.json";
import contestationEtatDesLieux from "@/content/lettres/immobilier/contestation-etat-des-lieux.json";
import demandeLogementSocial from "@/content/lettres/immobilier/demande-logement-social.json";

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
  ruptureConventionnelle as Letter,
  lettreMotivation as Letter,
  candidatureSpontanee as Letter,
  demandeAugmentation as Letter,
  congeParental as Letter,
  congeSansSolde as Letter,
  // Immobilier
  preavis1Mois as Letter,
  preavis3Mois as Letter,
  restitutionCaution as Letter,
  contestationCharges as Letter,
  demandeTravauxProprietaire as Letter,
  contestationEtatDesLieux as Letter,
  demandeLogementSocial as Letter,
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
