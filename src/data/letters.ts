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
  // Voisinage
  "nuisances-sonores": "Volume2",
  "empietement-terrain": "Map",
  "mitoyennete-cloture": "ArrowLeftRight",
  "signalement-maire": "Megaphone",
  "troubles-olfactifs": "Wind",
  // Consommation
  "retractation-14-jours": "RotateCcw",
  "livraison-non-recue": "PackageX",
  "garantie-legale-conformite": "BadgeCheck",
  "mise-en-demeure-sav": "AlertTriangle",
  "opposition-prelevement": "Ban",
  "contestation-facture": "FileX",
  "retractation-demarchage": "ShoppingBag",
  // Administratif
  "contestation-amende": "ShieldAlert",
  "delai-paiement-impots": "Calculator",
  "recours-gracieux": "Scale",
  "changement-situation-caf": "UserCheck",
  "demande-extrait-casier": "ScrollText",
  "demande-acte-naissance": "FileCheck",
  "recours-hierarchique": "Flag",
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

// === VOISINAGE ===
import nuisancesSonores from "@/content/lettres/voisinage/nuisances-sonores.json";
import empietementTerrain from "@/content/lettres/voisinage/empietement-terrain.json";
import mitoyenneteCloture from "@/content/lettres/voisinage/mitoyennete-cloture.json";
import signalementMaire from "@/content/lettres/voisinage/signalement-maire.json";
import troublesOlfactifs from "@/content/lettres/voisinage/troubles-olfactifs.json";

// === CONSOMMATION ===
import retractation14Jours from "@/content/lettres/consommation/retractation-14-jours.json";
import livraisonNonRecue from "@/content/lettres/consommation/livraison-non-recue.json";
import miseEnDemeureSav from "@/content/lettres/consommation/mise-en-demeure-sav.json";
import garantieLegaleConformite from "@/content/lettres/consommation/garantie-legale-conformite.json";
import contestationFacture from "@/content/lettres/consommation/contestation-facture.json";
import oppositionPrelevement from "@/content/lettres/consommation/opposition-prelevement.json";
import retractationDemarchage from "@/content/lettres/consommation/retractation-demarchage.json";

// === ADMINISTRATIF ===
import contestationAmende from "@/content/lettres/administratif/contestation-amende.json";
import delaiPaiementImpots from "@/content/lettres/administratif/delai-paiement-impots.json";
import recoursGracieux from "@/content/lettres/administratif/recours-gracieux.json";
import changementSituationCaf from "@/content/lettres/administratif/changement-situation-caf.json";
import demandeExtraitCasier from "@/content/lettres/administratif/demande-extrait-casier.json";
import demandeActeNaissance from "@/content/lettres/administratif/demande-acte-naissance.json";
import recoursHierarchique from "@/content/lettres/administratif/recours-hierarchique.json";

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
  // Voisinage
  nuisancesSonores as Letter,
  empietementTerrain as Letter,
  mitoyenneteCloture as Letter,
  signalementMaire as Letter,
  troublesOlfactifs as Letter,
  // Consommation
  retractation14Jours as Letter,
  livraisonNonRecue as Letter,
  miseEnDemeureSav as Letter,
  garantieLegaleConformite as Letter,
  contestationFacture as Letter,
  oppositionPrelevement as Letter,
  retractationDemarchage as Letter,
  // Administratif
  contestationAmende as Letter,
  demandeActeNaissance as Letter,
  recoursGracieux as Letter,
  delaiPaiementImpots as Letter,
  demandeExtraitCasier as Letter,
  changementSituationCaf as Letter,
  recoursHierarchique as Letter,
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
