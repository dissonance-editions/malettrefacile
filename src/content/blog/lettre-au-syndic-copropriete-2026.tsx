import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "lettre-au-syndic-copropriete-2026",
  title: "Lettre au syndic de copropriété : modèles et droits 2026",
  description:
    "Lettre au syndic en 2026 : demande de travaux, contestation de charges, ajout d'un point à l'ordre du jour de l'AG. Modèles et fondements légaux.",
  excerpt:
    "Demande de travaux, contestation de charges, point à l'ordre du jour, accès aux documents : les modèles de courrier au syndic et leurs bases légales.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["copropriété", "syndic", "AG", "charges", "loi 1965"],
  category: "Immobilier & Logement",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Le syndic est l&rsquo;exécutant des décisions du syndicat des
        copropriétaires — pas votre adversaire. Mais pour faire bouger un
        dossier (travaux, charges, ordre du jour), il faut écrire dans les
        règles fixées par la loi du 10 juillet 1965 et son décret de 1967.
        Voici comment, en 2026.
      </p>

      <h2>Les courriers les plus fréquents</h2>
      <ul>
        <li>
          <strong>Demande de travaux urgents</strong> sur parties communes
          (article 18 de la loi de 1965).
        </li>
        <li>
          <strong>Contestation de charges</strong> ou de répartition.
        </li>
        <li>
          <strong>Inscription d&rsquo;un point à l&rsquo;ordre du jour</strong>{" "}
          de l&rsquo;assemblée générale (article 10 du décret du 17 mars 1967).
        </li>
        <li>
          <strong>Demande d&rsquo;accès aux documents</strong> (factures,
          contrats, comptes).
        </li>
        <li>
          <strong>Contestation d&rsquo;une décision d&rsquo;AG</strong>{" "}
          (article 42 de la loi de 1965 — délai 2 mois).
        </li>
      </ul>

      <h2>Modèle : inscription d&rsquo;un point à l&rsquo;ordre du jour</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Lot n° X]

[Cabinet du syndic]
[Adresse]

À [Ville], le [date]

Objet : Demande d'inscription d'une question à l'ordre du
jour de la prochaine assemblée générale
Lettre recommandée avec AR

Madame, Monsieur,

En qualité de copropriétaire du lot n° [numéro] de
l'immeuble sis [adresse], et conformément à l'article 10
du décret n° 67-223 du 17 mars 1967, je vous demande
d'inscrire à l'ordre du jour de la prochaine assemblée
générale la question suivante :

  [Énoncé clair et précis du point, ex. : "Vote sur la
  réfection de la toiture suite au devis du …"]

Vous trouverez en pièce jointe les documents nécessaires
à l'instruction de cette question :

  - [pièce 1, ex. devis]
  - [pièce 2, ex. notice technique]

Je vous prie d'agréer, Madame, Monsieur, l'expression de
mes salutations distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Pour personnaliser ce modèle ou rédiger d&rsquo;autres courriers
        (contestation charges, demande de travaux), passez par notre{" "}
        <Link href="/generateur">générateur</Link>.
      </p>

      <h2>Délais à connaître</h2>
      <ul>
        <li>
          <strong>Convocation à l&rsquo;AG</strong> — au moins 21 jours avant la
          date.
        </li>
        <li>
          <strong>Point à inscrire à l&rsquo;ordre du jour</strong> — à envoyer
          AVANT l&rsquo;envoi des convocations (en pratique, 2 mois avant
          l&rsquo;AG).
        </li>
        <li>
          <strong>Contestation d&rsquo;une décision d&rsquo;AG</strong> —{" "}
          <strong>2 mois</strong> à compter de la notification du PV (article
          42 loi 1965). Délai impératif.
        </li>
        <li>
          <strong>Action en répétition de charges indues</strong> — 5 ans.
        </li>
      </ul>

      <h2>Si le syndic ne répond pas</h2>
      <ol>
        <li>
          <strong>Mise en demeure</strong> en LRAR avec rappel du fondement
          légal et délai de 15 jours.
        </li>
        <li>
          <strong>Saisine du conseil syndical</strong> qui peut interpeller le
          syndic et envisager son non-renouvellement.
        </li>
        <li>
          <strong>Saisine du juge</strong> — tribunal judiciaire (avocat
          obligatoire en copropriété au-delà de 10 000 €).
        </li>
      </ol>

      <h2>FAQ</h2>
      <h3>Le syndic peut-il refuser d&rsquo;inscrire ma question ?</h3>
      <p>
        Non, dès lors que la demande est en LRAR, accompagnée des pièces
        nécessaires et envoyée dans les délais. Tout refus expose le syndic à
        sa responsabilité.
      </p>
      <h3>Comment contester une charge que je trouve abusive ?</h3>
      <p>
        Adressez d&rsquo;abord une demande écrite d&rsquo;explication
        (justificatifs, ventilation). En cas de désaccord, contestez la
        décision d&rsquo;AG qui a validé l&rsquo;appel de fonds — dans les 2
        mois suivant la notification du PV.
      </p>
      <h3>Puis-je demander à voir les contrats du syndic ?</h3>
      <p>
        Oui : tout copropriétaire a le droit de consulter les pièces
        justificatives des charges sur place, lors d&rsquo;un rendez-vous
        organisé entre la convocation et l&rsquo;AG.
      </p>

      <div className="cta-box">
        <h3>Faire bouger votre dossier copropriété</h3>
        <p>
          Modèles adaptés (travaux, charges, ordre du jour, contestation),
          fondement légal cité, envoi en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma lettre au syndic →
        </Link>
      </div>
    </>
  );
}
