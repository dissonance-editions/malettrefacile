import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "contester-licenciement-guide-2026",
  title: "Contester un licenciement : procédure et modèle 2026",
  description:
    "Contester un licenciement en 2026 : motifs recevables, délai de prescription 12 mois, conseil de prud'hommes, modèle de lettre et indemnités possibles.",
  excerpt:
    "Délai de 12 mois, motifs recevables, saisine des prud'hommes, indemnités possibles : la procédure complète pour contester un licenciement, avec un modèle de courrier.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 6,
  tags: [
    "licenciement",
    "prud'hommes",
    "code du travail",
    "contestation",
    "indemnités",
  ],
  category: "Emploi & Travail",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Un licenciement peut être contesté quand il est jugé injustifié,
        irrégulier ou discriminatoire. La procédure 2026 reste accessible —
        mais le délai pour agir est court : <strong>12 mois</strong> à compter
        de la notification. Voici la marche à suivre, les motifs recevables, et
        un modèle de courrier préparatoire.
      </p>

      <h2>Quels licenciements peut-on contester ?</h2>
      <p>
        Tout licenciement, qu&rsquo;il soit pour motif personnel ou économique,
        peut être contesté. La contestation peut porter sur :
      </p>
      <ul>
        <li>
          <strong>Le fond — l&rsquo;absence de cause réelle et sérieuse</strong>{" "}
          (article L1232-1 du Code du travail). Faute non caractérisée, motif
          inexistant ou disproportionné.
        </li>
        <li>
          <strong>La forme — l&rsquo;irrégularité de procédure</strong> :
          convocation tardive, absence d&rsquo;entretien préalable, lettre de
          licenciement non motivée ou notifiée hors délai.
        </li>
        <li>
          <strong>Le caractère nul du licenciement</strong> : discrimination
          (article L1132-1), harcèlement, atteinte à une liberté fondamentale,
          maternité, accident du travail, lanceur d&rsquo;alerte.
        </li>
      </ul>

      <h2>Délais à connaître</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Délai</th>
              <th>Point de départ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Contestation du licenciement</td>
              <td>12 mois</td>
              <td>Notification de la lettre de licenciement</td>
            </tr>
            <tr>
              <td>Contestation rupture conventionnelle</td>
              <td>12 mois</td>
              <td>Homologation</td>
            </tr>
            <tr>
              <td>Action pour discrimination</td>
              <td>5 ans</td>
              <td>Révélation de la discrimination</td>
            </tr>
            <tr>
              <td>Demande de précision des motifs</td>
              <td>15 jours</td>
              <td>Notification de la lettre</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Le délai de 12 mois est <strong>impératif</strong>. Au-delà, l&rsquo;action
        est forclose, même si le licenciement est manifestement abusif.
      </p>

      <h2>Étape 1 — Demander la précision des motifs</h2>
      <p>
        Depuis l&rsquo;ordonnance Macron de 2017 (article R1232-13), le salarié
        dispose de <strong>15 jours</strong> après la notification du
        licenciement pour demander à l&rsquo;employeur de préciser les motifs.
        L&rsquo;employeur a 15 jours pour répondre. Sans demande, vous vous
        privez d&rsquo;un argument majeur en cas de motivation insuffisante.
      </p>

      <h2>Étape 2 — Le courrier préalable</h2>
      <p>
        Avant la saisine des prud&rsquo;hommes, un courrier formel à
        l&rsquo;employeur peut débloquer la situation : il vous évite parfois
        une procédure et constitue une pièce utile pour le dossier.
      </p>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]

[Société]
À l'attention du dirigeant / DRH
[Adresse]

À [Ville], le [date]

Objet : Contestation de la lettre de licenciement notifiée
le [date]
Lettre recommandée avec AR

Madame, Monsieur,

J'ai reçu le [date de notification] votre lettre de
licenciement faisant état de [motif invoqué par l'employeur].

Après examen, je conteste formellement le bien-fondé de cette
décision, pour les raisons suivantes :

  - [Motif 1 : faits non caractérisés, exposé précis]
  - [Motif 2 : non-respect de la procédure, ex. délai de
  convocation, défaut d'entretien]
  - [Motif 3 : éléments contraires aux faits invoqués]

Conformément à [l'article L1232-1 / l'article L1232-6 du Code
du travail], le licenciement doit reposer sur une cause réelle
et sérieuse, dûment motivée et notifiée dans les formes. Tel
n'est pas le cas en l'espèce.

Je vous mets donc en demeure de bien vouloir reconsidérer
cette décision et de me proposer une solution amiable
(réintégration, transaction, requalification) dans un délai
de 15 jours à compter de la réception du présent courrier.

À défaut, je me réserve le droit de saisir le conseil de
prud'hommes compétent afin de faire reconnaître l'absence
de cause réelle et sérieuse, et solliciter les indemnités
correspondantes.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]

Pièces jointes : copie de la lettre de licenciement,
copie du contrat de travail`}</pre>
      <p>
        Notre <Link href="/generateur">générateur</Link> adapte cette lettre à
        votre situation (motif personnel, économique, faute grave).
      </p>

      <h2>Étape 3 — Saisir le conseil de prud&rsquo;hommes</h2>
      <p>
        La saisine se fait par requête écrite (formulaire Cerfa 15586*10) ou
        par avocat. Elle ouvre une procédure en deux temps :
      </p>
      <ol>
        <li>
          <strong>Bureau de conciliation et d&rsquo;orientation (BCO)</strong>{" "}
          — tentative de règlement amiable. Si accord, signature d&rsquo;un
          procès-verbal.
        </li>
        <li>
          <strong>Bureau de jugement</strong> — si la conciliation échoue. Le
          délai moyen avant audience est de 12 à 18 mois selon les juridictions.
        </li>
      </ol>

      <h2>Quelles indemnités possibles ?</h2>
      <ul>
        <li>
          <strong>Licenciement sans cause réelle et sérieuse</strong> —
          indemnité encadrée par le « barème Macron » (article L1235-3 du Code
          du travail) : de 1 à 20 mois de salaire selon ancienneté et taille de
          l&rsquo;entreprise.
        </li>
        <li>
          <strong>Licenciement nul</strong> (discrimination, harcèlement,
          maternité…) — indemnité minimale de <strong>6 mois de salaire</strong>{" "}
          + dommages-intérêts complémentaires + possibilité de réintégration.
        </li>
        <li>
          <strong>Irrégularité de procédure seule</strong> — indemnité maximale
          de 1 mois de salaire.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Faut-il un avocat aux prud&rsquo;hommes ?</h3>
      <p>
        Non, pas en première instance. Vous pouvez vous défendre seul ou être
        assisté d&rsquo;un défenseur syndical. En appel, l&rsquo;avocat est
        obligatoire depuis 2016.
      </p>
      <h3>Et si j&rsquo;ai signé un solde de tout compte ?</h3>
      <p>
        Le solde de tout compte n&rsquo;empêche pas une action prud&rsquo;homale,
        à condition de le dénoncer dans les 6 mois suivant sa signature, ou
        s&rsquo;il a été signé sous contrainte ou erreur.
      </p>
      <h3>Le barème Macron est-il vraiment opposable ?</h3>
      <p>
        Oui, validé par le Conseil constitutionnel (2018) et la Cour de
        cassation (mai 2022). Il peut toutefois être écarté en cas de
        licenciement nul (discrimination, harcèlement…).
      </p>
      <h3>Combien coûte une procédure prud&rsquo;homale ?</h3>
      <p>
        Sans avocat : zéro (procédure gratuite). Avec avocat : 1 500 à 5 000 €
        selon la complexité, parfois pris en charge par votre protection
        juridique ou l&rsquo;aide juridictionnelle.
      </p>

      <div className="cta-box">
        <h3>Préparer votre contestation</h3>
        <p>
          Lettre de contestation adaptée au motif invoqué (économique,
          personnel, faute grave), envoi en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma contestation →
        </Link>
      </div>
    </>
  );
}
