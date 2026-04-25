export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  letterCount: number;
}

export const categories: Category[] = [
  {
    slug: "resiliation",
    name: "Résiliation",
    description:
      "Résiliez vos contrats d'assurance, mutuelle, box internet, abonnement téléphone et bien plus.",
    icon: "✂️",
    letterCount: 10,
  },
  {
    slug: "emploi",
    name: "Emploi & Travail",
    description:
      "Démission, rupture conventionnelle, congé parental, candidature spontanée, demande d'augmentation.",
    icon: "💼",
    letterCount: 35,
  },
  {
    slug: "immobilier",
    name: "Immobilier & Logement",
    description:
      "Préavis de départ, restitution de caution, contestation de charges, mise en demeure travaux.",
    icon: "🏠",
    letterCount: 30,
  },
  {
    slug: "administratif",
    name: "Administratif",
    description:
      "Contestation d'amende, délai de paiement impôts, recours gracieux, demandes à la CAF.",
    icon: "🏛️",
    letterCount: 35,
  },
  {
    slug: "consommation",
    name: "Consommation & Litiges",
    description:
      "Rétractation, mise en demeure, contestation de facture, réclamation livraison, remboursement.",
    icon: "🛒",
    letterCount: 30,
  },
  {
    slug: "voisinage",
    name: "Voisinage & Vie quotidienne",
    description:
      "Nuisances sonores, empiètement, clôture mitoyenne, signalement au maire.",
    icon: "🏘️",
    letterCount: 15,
  },
  {
    slug: "famille",
    name: "Famille & Succession",
    description:
      "Déclaration de décès, succession, pension alimentaire, changement de nom.",
    icon: "👨‍👩‍👧‍👦",
    letterCount: 15,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
