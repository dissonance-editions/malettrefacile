import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "droit-retractation-14-jours-2026",
  title: "Droit de rétractation 14 jours : modèle et exceptions 2026",
  description:
    "Droit de rétractation de 14 jours en 2026 : achat en ligne, démarchage, exceptions, modèle de lettre et procédure de remboursement.",
  excerpt:
    "Achat en ligne, démarchage, exceptions : tout sur les 14 jours pour changer d'avis, et un modèle de lettre conforme à l'annexe du Code de la consommation.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["rétractation", "achat en ligne", "VAD", "démarchage", "consommation"],
  category: "Consommation & Litiges",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Acheté en ligne et finalement déçu ? Démarché à domicile et envie de
        revenir sur votre signature ? Le droit de rétractation de{" "}
        <strong>14 jours</strong> permet d&rsquo;annuler sans avoir à se
        justifier — sous certaines conditions. Voici la procédure 2026 et un
        modèle de formulaire conforme.
      </p>

      <h2>Quand s&rsquo;applique le délai de 14 jours ?</h2>
      <p>
        Le droit de rétractation s&rsquo;applique aux contrats conclus à
        distance ou hors établissement (articles L221-18 et suivants du Code de
        la consommation) :
      </p>
      <ul>
        <li>
          <strong>Achat en ligne</strong> sur un site e-commerce.
        </li>
        <li>
          <strong>Achat par téléphone, courrier ou catalogue</strong>.
        </li>
        <li>
          <strong>Démarchage à domicile</strong>, sur le lieu de travail ou
          dans la rue.
        </li>
        <li>
          <strong>Foires et salons</strong> — depuis 2014, à condition que le
          professionnel l&rsquo;ait expressément mentionné.
        </li>
      </ul>

      <h2>Le décompte des 14 jours</h2>
      <p>
        Le délai court à compter :
      </p>
      <ul>
        <li>
          <strong>De la réception du bien</strong> pour les achats de produits.
        </li>
        <li>
          <strong>De la conclusion du contrat</strong> pour les services.
        </li>
      </ul>
      <p>
        Si le professionnel a omis de vous informer de ce droit, le délai est
        prolongé jusqu&rsquo;à <strong>12 mois</strong> (article L221-20).
      </p>

      <h2>Les exceptions à connaître</h2>
      <p>
        Tout n&rsquo;est pas rétractable. L&rsquo;article L221-28 liste 14
        exceptions, dont :
      </p>
      <ul>
        <li>
          Biens confectionnés sur mesure ou personnalisés.
        </li>
        <li>
          Biens périssables (denrées alimentaires).
        </li>
        <li>
          CD, DVD, logiciels descellés.
        </li>
        <li>
          Hôtellerie, transport, location de voiture à date fixe.
        </li>
        <li>
          Services pleinement exécutés avec votre accord exprès avant la fin du
          délai.
        </li>
        <li>
          Contenus numériques téléchargés avec votre accord exprès et
          renoncement au droit de rétractation.
        </li>
      </ul>

      <h2>Modèle de formulaire de rétractation</h2>
      <p>
        Le modèle ci-dessous est calqué sur l&rsquo;annexe du Code de la
        consommation. Il peut être adressé par e-mail ou en LRAR.
      </p>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]

[Société]
Service client
[Adresse]

À [Ville], le [date]

Objet : Exercice du droit de rétractation —
Commande n° [numéro] du [date]

Madame, Monsieur,

Je vous notifie par la présente ma rétractation du contrat
portant sur la vente du bien / la prestation du service
ci-dessous :

  - Description : [bien ou service]
  - Référence / numéro de commande : [numéro]
  - Commandé le [date] / Reçu le [date]

Je vous demande de bien vouloir procéder au remboursement
intégral de la somme versée, soit [montant] euros, dans un
délai maximum de 14 jours à compter de la réception du
présent courrier, conformément à l'article L221-24 du Code
de la consommation.

[Pour les biens :] Je m'engage à vous renvoyer le bien dans
les 14 jours suivant l'envoi de cette lettre.

Je vous prie d'agréer, Madame, Monsieur, mes salutations
distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Notre <Link href="/generateur">générateur</Link> propose une version
        adaptée selon votre cas (bien, service, contenu numérique, démarchage).
      </p>

      <h2>Et après ?</h2>
      <ul>
        <li>
          Le professionnel doit vous rembourser dans les{" "}
          <strong>14 jours</strong> suivant la rétractation, frais de livraison
          standard inclus.
        </li>
        <li>
          Vous renvoyez le bien dans les 14 jours après l&rsquo;envoi de la
          lettre — frais de retour à votre charge sauf accord contraire.
        </li>
        <li>
          En cas de retard de remboursement, des intérêts au taux légal majoré
          courent automatiquement (article L242-4).
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Puis-je me rétracter pour un produit déjà utilisé ?</h3>
      <p>
        Oui, mais le professionnel peut réduire le remboursement si vous avez
        manipulé le bien au-delà de ce qui est nécessaire pour l&rsquo;essayer
        (comme en magasin).
      </p>
      <h3>Et pour un achat en magasin physique ?</h3>
      <p>
        Pas de droit de rétractation légal : le commerçant n&rsquo;est tenu que
        par sa politique commerciale (« satisfait ou remboursé »).
      </p>
      <h3>Le vendeur refuse, que faire ?</h3>
      <p>
        Mise en demeure, puis médiateur de la consommation, puis tribunal
        judiciaire le cas échéant.
      </p>

      <div className="cta-box">
        <h3>Se rétracter en 2 minutes</h3>
        <p>
          Formulaire conforme au Code de la consommation, envoi suivi et
          recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Exercer mon droit de rétractation →
        </Link>
      </div>
    </>
  );
}
