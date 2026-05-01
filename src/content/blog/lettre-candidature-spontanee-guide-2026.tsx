import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "lettre-candidature-spontanee-guide-2026",
  title: "Lettre de candidature spontanée : modèle et conseils 2026",
  description:
    "Lettre de candidature spontanée 2026 : structure, accroche, modèle prêt à personnaliser et erreurs à éviter pour décrocher un entretien.",
  excerpt:
    "Structure en 4 paragraphes, accroche qui marche, modèle prêt à personnaliser : l'essentiel pour qu'une candidature spontanée déclenche un entretien.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["candidature spontanée", "emploi", "lettre de motivation", "recrutement"],
  category: "Emploi & Travail",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        70 % des recrutements ne passent jamais par une annonce. La candidature
        spontanée bien rédigée reste l&rsquo;un des canaux les plus efficaces —
        à condition d&rsquo;éviter les formules génériques et de cibler. Voici
        la structure qui fonctionne en 2026, avec un modèle.
      </p>

      <h2>Structure en 4 paragraphes</h2>
      <ol>
        <li>
          <strong>L&rsquo;accroche (2-3 lignes)</strong> — pourquoi cette
          entreprise précisément. Citez un fait concret : levée de fonds
          récente, ouverture de site, projet, valeur affichée.
        </li>
        <li>
          <strong>Vous (3-4 lignes)</strong> — qui vous êtes, votre expertise,
          votre dernier accomplissement chiffré.
        </li>
        <li>
          <strong>L&rsquo;apport (3-4 lignes)</strong> — ce que vous pouvez
          apporter à <em>cette</em> entreprise, pas en général.
        </li>
        <li>
          <strong>L&rsquo;appel à l&rsquo;action</strong> — proposer un
          échange, une date, un format (visio, bureau).
        </li>
      </ol>

      <h2>Modèle de lettre</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[E-mail · Téléphone]
[LinkedIn]

[Société]
À l'attention de [Nom du recruteur ou du dirigeant]
[Adresse]

À [Ville], le [date]

Objet : Candidature spontanée — [intitulé du poste visé]

Madame, Monsieur,

[Accroche : "Votre annonce de l'ouverture du site de Lyon m'a
particulièrement marqué…" / "Je suis votre démarche autour de
[sujet] depuis…"]

[Profil] Diplômé(e) de [formation] et fort(e) de [X] années
d'expérience en [domaine], j'ai notamment [accomplissement
chiffré : "réduit de 30 % le délai de traitement…"].

[Apport] Je suis convaincu(e) que mon expertise en [compétence]
et ma connaissance de [secteur / outil / marché] pourraient
soutenir vos enjeux actuels, en particulier sur [projet ou
problématique identifiée].

Je serais ravi(e) d'échanger avec vous lors d'un rendez-vous
ou d'un appel à votre convenance. Vous trouverez mon CV en
pièce jointe.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Pour adapter automatiquement à votre profil, utilisez notre{" "}
        <Link href="/generateur">générateur de lettres</Link>.
      </p>

      <h2>Les 5 erreurs qui font passer la lettre à la corbeille</h2>
      <ol>
        <li>
          <strong>Le « Madame, Monsieur, »</strong> en tête d&rsquo;un courrier
          adressé à une PME où le dirigeant est nommément identifié sur
          LinkedIn.
        </li>
        <li>
          <strong>La paraphrase du CV</strong> — la lettre n&rsquo;est pas un
          résumé du CV, c&rsquo;est un argumentaire ciblé.
        </li>
        <li>
          <strong>Le « je »</strong> à chaque phrase — alternez « vous » /
          « nous » / « je ».
        </li>
        <li>
          <strong>Les adjectifs vides</strong> (« dynamique », « motivé »,
          « rigoureux »). Préférez les preuves chiffrées.
        </li>
        <li>
          <strong>Une page entière</strong> — visez 250 mots, 4 paragraphes,
          jamais plus d&rsquo;une demi-page.
        </li>
      </ol>

      <h2>FAQ</h2>
      <h3>Mail ou courrier papier ?</h3>
      <p>
        Mail dans 95 % des cas. Le courrier papier garde un effet de
        différenciation pour les TPE/PME locales et certains secteurs
        traditionnels (luxe, droit, conseil patrimonial).
      </p>
      <h3>Faut-il joindre un CV obligatoirement ?</h3>
      <p>
        Oui — la lettre éveille l&rsquo;intérêt, le CV donne la matière. Sans
        CV, votre candidature paraîtra incomplète.
      </p>
      <h3>Quand relancer si pas de réponse ?</h3>
      <p>
        10 à 15 jours après l&rsquo;envoi, par mail bref. Pas avant.
      </p>

      <div className="cta-box">
        <h3>Décrochez votre entretien</h3>
        <p>
          Lettre personnalisée à votre profil et au poste visé, en 2 minutes.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma candidature →
        </Link>
      </div>
    </>
  );
}
