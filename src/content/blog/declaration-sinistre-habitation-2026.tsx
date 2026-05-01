import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "declaration-sinistre-habitation-2026",
  title: "Déclaration de sinistre habitation : modèle et délais 2026",
  description:
    "Déclaration de sinistre habitation 2026 : délais légaux, mentions obligatoires, modèle de lettre par type de sinistre (dégât des eaux, vol, incendie).",
  excerpt:
    "Délais selon le sinistre, mentions obligatoires, pièces à joindre : un modèle adapté à chaque cas pour déclarer rapidement un dégât des eaux, vol ou incendie.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["sinistre", "assurance habitation", "dégât des eaux", "vol", "incendie"],
  category: "Consommation & Litiges",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Dégât des eaux, vol, incendie, tempête : la déclaration de sinistre
        suit des délais courts fixés par le Code des assurances. Manquer
        l&rsquo;échéance peut entraîner la déchéance de garantie. Voici les
        règles 2026 et un modèle adaptable.
      </p>

      <h2>Les délais selon le sinistre</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Type de sinistre</th>
              <th>Délai de déclaration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dégât des eaux, incendie, tempête</td>
              <td>5 jours ouvrés</td>
            </tr>
            <tr>
              <td>Vol, vandalisme</td>
              <td>2 jours ouvrés</td>
            </tr>
            <tr>
              <td>Catastrophe naturelle</td>
              <td>10 jours après publication de l&rsquo;arrêté au JO</td>
            </tr>
            <tr>
              <td>Catastrophe technologique</td>
              <td>5 jours ouvrés</td>
            </tr>
            <tr>
              <td>Mortalité bétail / animaux</td>
              <td>24 heures</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Le délai court à compter de la <strong>connaissance du
        sinistre</strong> par l&rsquo;assuré, pas de sa survenance. Code des
        assurances, article L113-2.
      </p>

      <h2>Les mentions obligatoires</h2>
      <ul>
        <li>Nom, prénom, adresse, numéro de contrat.</li>
        <li>Date, heure et lieu du sinistre.</li>
        <li>Description précise des circonstances.</li>
        <li>Description et estimation des dommages.</li>
        <li>Coordonnées des éventuels tiers ou témoins.</li>
        <li>Pour le vol : récépissé de plainte de la police ou gendarmerie.</li>
      </ul>

      <h2>Modèle (dégât des eaux)</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse du logement sinistré]
[Numéro de contrat]

[Compagnie d'assurance]
Service sinistres
[Adresse]

À [Ville], le [date]

Objet : Déclaration de sinistre — Dégât des eaux
Contrat n° [numéro]
Lettre recommandée avec AR

Madame, Monsieur,

Je vous déclare, par la présente et dans le délai légal de
5 jours ouvrés, le sinistre suivant survenu dans le logement
assuré :

  - Date et heure de découverte : [date, heure]
  - Type de sinistre : dégât des eaux
  - Origine probable : [fuite chaudière, infiltration toiture,
  refoulement, voisin du dessus…]
  - Pièces touchées : [liste]
  - Dommages constatés : [description : sols, murs, mobilier,
  électroménager…]
  - Estimation des dommages : [montant approximatif]

[Le cas échéant :] Un constat amiable a été établi avec
[le voisin / le syndic] le [date], copie ci-jointe.

Je me tiens à votre disposition pour la visite éventuelle d'un
expert. Je conserve les biens endommagés et les pièces
justificatives en attendant son passage.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]

Pièces jointes : photos, constat amiable, factures éventuelles`}</pre>
      <p>
        Pour adapter à un vol, un incendie ou une catastrophe naturelle,
        utilisez notre <Link href="/generateur">générateur</Link>.
      </p>

      <h2>Conserver les preuves</h2>
      <ul>
        <li>
          <strong>Photographier</strong> tous les dégâts avant tout nettoyage,
          côté large et côté détail.
        </li>
        <li>
          <strong>Conserver les biens endommagés</strong> jusqu&rsquo;au passage
          de l&rsquo;expert (ou autorisation écrite contraire de
          l&rsquo;assureur).
        </li>
        <li>
          <strong>Réunir les factures d&rsquo;achat</strong> ou — à défaut —
          des photos antérieures, des relevés bancaires, des emails de livraison.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Que se passe-t-il si je dépasse le délai ?</h3>
      <p>
        L&rsquo;assureur peut refuser sa garantie s&rsquo;il prouve que le
        retard lui a causé un préjudice (article L113-2). En pratique, déclarez
        même hors délai et expliquez le motif (hospitalisation, déplacement…).
      </p>
      <h3>Faut-il déposer plainte avant la déclaration de vol ?</h3>
      <p>
        Oui, le récépissé de dépôt est obligatoire. Idéalement dans les 24 h.
      </p>
      <h3>Qui paie en cas de dégât des eaux entre voisins ?</h3>
      <p>
        La convention IRSI (Indemnisation et Recours des Sinistres Immeubles)
        organise depuis 2018 la répartition entre assureurs : votre propre
        assureur vous indemnise, puis se retourne contre celui du responsable.
      </p>

      <div className="cta-box">
        <h3>Déclarer en 3 minutes</h3>
        <p>
          Modèle adapté à chaque type de sinistre, mentions obligatoires
          intégrées, envoi en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Déclarer mon sinistre →
        </Link>
      </div>
    </>
  );
}
