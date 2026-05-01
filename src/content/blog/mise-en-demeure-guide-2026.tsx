import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "mise-en-demeure-guide-2026",
  title: "Mise en demeure : modèle et procédure 2026",
  description:
    "Mise en demeure 2026 : à quoi sert-elle, quand est-elle obligatoire, mentions obligatoires, modèle gratuit et délai à accorder. Guide juridique complet.",
  excerpt:
    "Quand est-elle obligatoire, que doit-elle contenir, quel délai accorder, et comment passer à l'étape suivante : tout sur la mise en demeure et son modèle.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 6,
  tags: [
    "mise en demeure",
    "litige",
    "consommation",
    "code civil",
    "recouvrement",
  ],
  category: "Consommation & Litiges",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        La mise en demeure est l&rsquo;étape charnière de tout litige : elle
        transforme une simple réclamation en avertissement formel, et conditionne
        souvent l&rsquo;accès au juge. Bien rédigée, elle débloque 80 % des
        situations sans procès. Mal rédigée, elle ne vaut rien. Voici le mode
        d&rsquo;emploi 2026.
      </p>

      <h2>Qu&rsquo;est-ce qu&rsquo;une mise en demeure ?</h2>
      <p>
        La mise en demeure est une <strong>sommation écrite</strong> par
        laquelle vous exigez d&rsquo;une personne (particulier, professionnel,
        administration) qu&rsquo;elle exécute une obligation : payer une dette,
        livrer un bien, réaliser des travaux, cesser un trouble, restituer un
        objet…
      </p>
      <p>
        Depuis la réforme du droit des obligations (ordonnance n° 2016-131), elle
        est codifiée à l&rsquo;article <strong>1344 du Code civil</strong> :
        elle est, dans la plupart des cas, le préalable obligatoire à toute
        action en exécution forcée, en résolution du contrat ou en
        dommages-intérêts.
      </p>

      <h2>Les 6 mentions obligatoires</h2>
      <ol>
        <li>
          <strong>Vos coordonnées complètes</strong> et celles du destinataire.
        </li>
        <li>
          <strong>Le titre explicite</strong> : « Mise en demeure » (et non
          simple « rappel » ou « relance »).
        </li>
        <li>
          <strong>Le rappel précis des faits</strong> et des obligations non
          tenues : dates, montants, références contractuelles.
        </li>
        <li>
          <strong>L&rsquo;injonction claire</strong> : ce que vous exigez
          (paiement de X euros, livraison du bien, fin du trouble…).
        </li>
        <li>
          <strong>Le délai accordé</strong> pour s&rsquo;exécuter — le « délai
          raisonnable » de l&rsquo;article 1344-1.
        </li>
        <li>
          <strong>Les conséquences en cas d&rsquo;inaction</strong> : saisine du
          tribunal, intérêts de retard, résolution du contrat…
        </li>
      </ol>
      <p>
        L&rsquo;envoi en lettre recommandée avec AR n&rsquo;est pas
        juridiquement obligatoire (article 1344 admet « tout acte portant
        interpellation suffisante »), mais il est <strong>indispensable en
        pratique</strong> pour prouver la réception.
      </p>

      <h2>Quel délai accorder ?</h2>
      <p>
        Le Code civil parle de « délai raisonnable », sans le chiffrer. La
        jurisprudence et les usages distinguent :
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Type de litige</th>
              <th>Délai usuel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Paiement d&rsquo;une facture</td>
              <td>8 à 15 jours</td>
            </tr>
            <tr>
              <td>Livraison d&rsquo;un bien</td>
              <td>15 jours</td>
            </tr>
            <tr>
              <td>Travaux à réaliser</td>
              <td>1 mois</td>
            </tr>
            <tr>
              <td>Restitution de dépôt de garantie</td>
              <td>15 jours après expiration du délai légal</td>
            </tr>
            <tr>
              <td>Cessation d&rsquo;un trouble (voisinage…)</td>
              <td>15 jours à 1 mois</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Mieux vaut un délai un peu long et raisonnable qu&rsquo;un délai court
        attaqué pour son caractère expéditif.
      </p>

      <h2>Modèle de mise en demeure</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]

[Destinataire]
[Adresse]
[Code postal, Ville]

À [Ville], le [date]

Objet : MISE EN DEMEURE — [objet précis]
Lettre recommandée avec accusé de réception

Madame, Monsieur,

Par lettre du [date], je vous demandais [rappel de l'obligation :
paiement de la facture n° X d'un montant de Y €, livraison du
bien Z, exécution des travaux convenus le …]. À ce jour, vous
n'avez pas donné suite, malgré [le contrat / mes relances du …].

Par la présente, je vous mets en demeure, en application de
l'article 1344 du Code civil, de :

  [Préciser : payer la somme de X €, livrer le bien Z, achever
  les travaux conformément au devis du …]

dans un délai de [durée] à compter de la réception de ce
courrier.

À défaut, je serai contraint(e) de saisir la juridiction
compétente pour obtenir, outre l'exécution forcée, des
dommages-intérêts, des intérêts de retard au taux légal majoré
ainsi que le remboursement des frais de procédure.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Pour adapter ce modèle à votre litige précis (facture, livraison,
        travaux, voisinage…), notre{" "}
        <Link href="/generateur">générateur de lettres</Link> propose une
        version pré-remplie pour chaque cas.
      </p>

      <h2>Que se passe-t-il après ?</h2>
      <p>
        La mise en demeure produit trois effets juridiques majeurs :
      </p>
      <ul>
        <li>
          <strong>Point de départ des intérêts moratoires</strong> au taux
          légal (article 1344-1 du Code civil).
        </li>
        <li>
          <strong>Transfert des risques</strong> : si la chose à livrer
          disparaît, le débiteur en supporte les conséquences.
        </li>
        <li>
          <strong>Prérequis à l&rsquo;action en justice</strong> pour la
          résolution du contrat ou la demande de dommages-intérêts.
        </li>
      </ul>
      <p>
        Si le destinataire ne s&rsquo;exécute pas, vos options sont la
        conciliation (gratuite, conciliateur de justice), la médiation, ou
        directement la saisine du tribunal compétent (judiciaire pour les
        litiges entre 5 000 € et 10 000 € sans représentation, juge des
        contentieux de la protection en dessous).
      </p>

      <h2>FAQ</h2>
      <h3>Une mise en demeure est-elle obligatoire avant un procès ?</h3>
      <p>
        Pour les litiges civils inférieurs à 5 000 €, une tentative préalable de
        résolution amiable (conciliation, médiation, négociation) est
        obligatoire depuis 2020. La mise en demeure assortie d&rsquo;une offre
        de conciliation remplit cette obligation.
      </p>
      <h3>Faut-il un avocat ?</h3>
      <p>
        Non, vous pouvez l&rsquo;envoyer vous-même. Un commissaire de justice
        peut le faire pour vous (signification) — coût ≈ 50-100 € — pour donner
        plus de poids à la démarche.
      </p>
      <h3>Mise en demeure et lettre de relance, quelle différence ?</h3>
      <p>
        La relance est informelle et sans effet juridique. La mise en demeure,
        elle, fait courir les intérêts moratoires et ouvre l&rsquo;accès au
        juge. Le titre est déterminant.
      </p>
      <h3>Le destinataire ne réclame pas le pli, est-ce un problème ?</h3>
      <p>
        Non. L&rsquo;avis de passage de La Poste, puis la mention « pli non
        réclamé », font foi : la mise en demeure est juridiquement opposable.
      </p>

      <div className="cta-box">
        <h3>Rédigez votre mise en demeure en 3 minutes</h3>
        <p>
          Modèle adapté à votre litige (impayé, livraison, travaux, voisinage),
          mentions obligatoires intégrées, envoi en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma mise en demeure →
        </Link>
      </div>
    </>
  );
}
