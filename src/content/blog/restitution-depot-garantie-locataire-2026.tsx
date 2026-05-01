import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "restitution-depot-garantie-locataire-2026",
  title: "Restitution du dépôt de garantie : délai, recours et modèle 2026",
  description:
    "Dépôt de garantie non restitué en 2026 : délais légaux (1 ou 2 mois), retenues abusives, modèle de mise en demeure, intérêts de retard.",
  excerpt:
    "Délais 1 ou 2 mois, retenues abusives, intérêts de retard : la procédure complète pour récupérer un dépôt de garantie qui traîne — avec un modèle de mise en demeure.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["dépôt de garantie", "caution", "bail", "locataire", "restitution"],
  category: "Immobilier & Logement",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Le dépôt de garantie (souvent appelé « caution ») doit être restitué
        rapidement après votre départ — la loi ALUR a posé des délais stricts
        et même une pénalité automatique en cas de retard. Voici comment le
        récupérer en 2026.
      </p>

      <h2>Les délais légaux</h2>
      <p>
        La <strong>loi du 6 juillet 1989, article 22</strong> distingue deux
        cas :
      </p>
      <ul>
        <li>
          <strong>1 mois</strong> si l&rsquo;état des lieux de sortie est
          conforme à celui d&rsquo;entrée.
        </li>
        <li>
          <strong>2 mois</strong> si des dégradations sont constatées et que le
          bailleur retient une partie pour les couvrir.
        </li>
      </ul>
      <p>
        Le délai court à compter de la <strong>remise des clés</strong>, qui
        doit être documentée (récépissé daté). En copropriété, le bailleur peut
        retenir provisoirement <strong>jusqu&rsquo;à 20 %</strong> du dépôt
        dans l&rsquo;attente de la régularisation des charges annuelles.
      </p>

      <h2>Retenues admises et abusives</h2>
      <p>
        Le bailleur ne peut retenir que des sommes <strong>justifiées</strong>{" "}
        par des pièces : devis, factures, état des lieux. Sont notamment
        admises :
      </p>
      <ul>
        <li>Réparations dues au locataire (au-delà de l&rsquo;usure normale).</li>
        <li>Loyers ou charges impayés.</li>
        <li>Régularisation de charges (justifiée par décompte).</li>
      </ul>
      <p>
        Sont <strong>abusives</strong> : la simple mention « peinture à
        refaire », la déduction forfaitaire sans devis, les retenues
        d&rsquo;usure normale (peinture qui jaunit, joints noircis, parquet
        marqué par mobilier).
      </p>

      <h2>Pénalité de retard automatique</h2>
      <p>
        Depuis la loi ALUR, tout retard expose le bailleur à une majoration
        automatique de <strong>10 % du loyer mensuel hors charges par mois de
        retard commencé</strong> (article 22, alinéa 8). Pas besoin de
        l&rsquo;invoquer pour qu&rsquo;elle soit due.
      </p>

      <h2>Modèle de mise en demeure</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Nouvelle adresse]
[Code postal, Ville]

[Bailleur ou agence]
[Adresse]

À [Ville], le [date]

Objet : MISE EN DEMEURE — Restitution du dépôt de garantie
Bail du [date] / Logement [adresse]
Lettre recommandée avec AR

Madame, Monsieur,

J'ai quitté le logement situé [adresse] le [date], après
remise des clés et état des lieux de sortie [conforme /
contradictoire].

À ce jour, soit plus de [1 mois / 2 mois] après cette remise,
je n'ai reçu ni la restitution du dépôt de garantie d'un
montant de [montant] euros, ni de justificatif des sommes
éventuellement retenues.

Par la présente, je vous mets en demeure de me restituer
ce dépôt de garantie dans un délai de 8 jours à compter
de la réception du présent courrier.

À défaut, et conformément à l'article 22 de la loi du
6 juillet 1989, je vous rappelle qu'une majoration de 10 %
du loyer mensuel hors charges par mois de retard commencé
est due, et je n'hésiterai pas à saisir la commission
départementale de conciliation puis le juge des contentieux
de la protection.

Je vous prie d'agréer, Madame, Monsieur, mes salutations
distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Notre <Link href="/generateur">générateur</Link> calcule
        automatiquement la pénalité due et adapte la lettre à votre situation.
      </p>

      <h2>Si rien ne bouge</h2>
      <ol>
        <li>
          <strong>Commission départementale de conciliation</strong> — gratuite,
          saisine en ligne, réponse sous 2 mois.
        </li>
        <li>
          <strong>Juge des contentieux de la protection</strong> (anciennement
          tribunal d&rsquo;instance) — pour les litiges locatifs sans plafond
          de montant. Procédure simplifiée, pas d&rsquo;avocat obligatoire en
          dessous de 10 000 €.
        </li>
      </ol>

      <h2>FAQ</h2>
      <h3>Le bailleur ne donne pas son adresse, comment faire ?</h3>
      <p>
        Adressez la lettre à l&rsquo;adresse mentionnée sur le bail. Si elle est
        invalide, l&rsquo;agence immobilière reste responsable du suivi.
      </p>
      <h3>Et si je n&rsquo;ai pas fait l&rsquo;état des lieux de sortie ?</h3>
      <p>
        Sans état des lieux, le bailleur ne peut prétendre à aucune retenue
        pour dégradations — le logement est présumé restitué en bon état
        (article 1731 du Code civil).
      </p>
      <h3>Combien de temps pour agir ?</h3>
      <p>
        3 ans à compter de la remise des clés (prescription triennale en
        matière locative).
      </p>

      <div className="cta-box">
        <h3>Récupérer son dépôt en 3 minutes</h3>
        <p>
          Calcul auto de la pénalité ALUR, mise en demeure conforme, envoi en
          recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma mise en demeure →
        </Link>
      </div>
    </>
  );
}
