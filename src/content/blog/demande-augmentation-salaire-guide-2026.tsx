import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "demande-augmentation-salaire-guide-2026",
  title: "Demande d'augmentation : lettre et stratégie 2026",
  description:
    "Demande d'augmentation 2026 : timing, argumentaire, modèle de lettre et erreurs à éviter pour obtenir une revalorisation salariale.",
  excerpt:
    "Quand demander, comment chiffrer, quels arguments et un modèle de lettre qui ouvre la porte d'un vrai rendez-vous de négociation salariale.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["augmentation", "salaire", "négociation", "emploi"],
  category: "Emploi & Travail",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Demander une augmentation est rarement spontané — mais souvent
        nécessaire. Une lettre bien construite n&rsquo;a pas vocation à obtenir
        directement le « oui » : son rôle est de déclencher un entretien dans
        de bonnes conditions. Voici comment, en 2026.
      </p>

      <h2>Quand demander ?</h2>
      <ul>
        <li>
          <strong>Après un succès mesurable</strong> — projet livré, objectif
          dépassé, prise en charge d&rsquo;une responsabilité supplémentaire.
        </li>
        <li>
          <strong>Avant ou pendant la campagne d&rsquo;entretiens
          annuels</strong> — quand le budget est encore négociable.
        </li>
        <li>
          <strong>Après 2 ans d&rsquo;ancienneté</strong> ou après un
          changement de fonction sans revalorisation.
        </li>
        <li>
          <strong>Hors période difficile</strong> — éviter immédiatement après
          une mauvaise nouvelle pour la société.
        </li>
      </ul>

      <h2>Comment chiffrer ?</h2>
      <p>
        Une demande crédible repose sur trois ancrages :
      </p>
      <ol>
        <li>
          <strong>Le marché</strong> — études salariales (Robert Half, APEC,
          Glassdoor) pour votre poste et votre région.
        </li>
        <li>
          <strong>L&rsquo;interne</strong> — grille de votre convention
          collective, ancrage par rapport aux collègues comparables.
        </li>
        <li>
          <strong>L&rsquo;inflation</strong> — l&rsquo;INSEE est votre ami pour
          documenter le pouvoir d&rsquo;achat.
        </li>
      </ol>
      <p>
        Demandez une fourchette (ex. +6 % à +9 %) plutôt qu&rsquo;un chiffre
        sec : cela laisse une marge de négociation à votre interlocuteur.
      </p>

      <h2>Modèle de lettre</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Service / Direction]

[Nom du manager ou DRH]
[Société]

À [Ville], le [date]

Objet : Demande de revalorisation salariale

Madame, Monsieur,

Je travaille au sein de [Société] en qualité de [fonction]
depuis le [date d'embauche]. Au cours de ces [X] années,
j'ai notamment :

  - [Accomplissement 1, chiffré]
  - [Accomplissement 2, chiffré]
  - [Prise de responsabilité]

Compte tenu de l'évolution de mes missions, des résultats
obtenus et des références salariales constatées sur le marché
pour des fonctions équivalentes, je souhaiterais ouvrir avec
vous un échange en vue d'une revalorisation de ma rémunération
brute annuelle, à hauteur d'environ [pourcentage ou fourchette].

Je reste à votre disposition pour en discuter lors d'un
entretien à votre convenance.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Personnalisez en 2 minutes avec notre{" "}
        <Link href="/generateur">générateur</Link>.
      </p>

      <h2>FAQ</h2>
      <h3>Lettre ou demande orale ?</h3>
      <p>
        Lettre — elle dépose une trace, oblige à une réponse formelle et donne
        le ton « je suis sérieux ». L&rsquo;oral viendra ensuite, en entretien.
      </p>
      <h3>Que faire si on me répond non ?</h3>
      <p>
        Demandez les conditions et le délai d&rsquo;une revalorisation
        ultérieure. Documentez la conversation par écrit. Si rien ne bouge sur
        12 mois, c&rsquo;est un signal pour explorer un changement de poste — en
        interne ou ailleurs.
      </p>
      <h3>Une augmentation se négocie-t-elle aussi en avantages ?</h3>
      <p>
        Absolument : tickets restaurant, jours de télétravail, prime sur
        objectifs, formation, voiture de fonction. Tous ces leviers ont un
        coût employeur — donc une valeur monétaire que vous pouvez intégrer.
      </p>

      <div className="cta-box">
        <h3>Ouvrez la conversation</h3>
        <p>
          Lettre personnalisée à votre poste, votre ancienneté et la grille
          conventionnelle, en 2 minutes.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma demande →
        </Link>
      </div>
    </>
  );
}
