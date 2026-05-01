import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "reclamation-remboursement-consommation-2026",
  title: "Réclamation et remboursement : modèle de lettre 2026",
  description:
    "Lettre de réclamation et demande de remboursement en 2026 : produit défectueux, service non rendu, garantie légale, modèle gratuit et procédure.",
  excerpt:
    "Garantie légale de conformité, vices cachés, service non rendu : la procédure pour obtenir un remboursement et un modèle qui marche, en 2026.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["réclamation", "remboursement", "garantie", "consommation"],
  category: "Consommation & Litiges",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Un produit défectueux, un service non rendu, une livraison qui
        n&rsquo;arrive pas : la loi protège le consommateur, mais encore faut-il
        savoir invoquer le bon texte. Voici comment rédiger une réclamation
        efficace et obtenir le remboursement, en 2026.
      </p>

      <h2>Trois fondements juridiques à connaître</h2>
      <ul>
        <li>
          <strong>Garantie légale de conformité</strong> (articles L217-3 à
          L217-17 du Code de la consommation) — 2 ans à compter de la livraison
          (24 mois sur le neuf, 12 mois sur l&rsquo;occasion). Le défaut est
          présumé existant à la livraison pendant cette période.
        </li>
        <li>
          <strong>Garantie des vices cachés</strong> (articles 1641 et suivants
          du Code civil) — 2 ans à compter de la découverte du vice, dans la
          limite de 20 ans depuis la vente.
        </li>
        <li>
          <strong>Inexécution contractuelle</strong> (article 1217 du Code
          civil) — pour les services non rendus ou mal rendus : exiger
          l&rsquo;exécution, la résolution ou des dommages-intérêts.
        </li>
      </ul>

      <h2>Quel est votre droit selon la situation ?</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Situation</th>
              <th>Vos options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Produit non conforme à la description</td>
              <td>Réparation, remplacement, ou remboursement</td>
            </tr>
            <tr>
              <td>Vice caché</td>
              <td>Garder le bien et obtenir une réduction de prix, ou rendre le bien et être remboursé</td>
            </tr>
            <tr>
              <td>Livraison non effectuée</td>
              <td>Mise en demeure de livrer, puis remboursement intégral</td>
            </tr>
            <tr>
              <td>Service non rendu</td>
              <td>Remboursement et/ou dommages-intérêts</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Modèle de réclamation</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]

[Société destinataire]
Service client / Service réclamations
[Adresse]

À [Ville], le [date]

Objet : Réclamation — Commande n° [numéro] du [date]
Demande de remboursement
Lettre recommandée avec AR

Madame, Monsieur,

Le [date], j'ai acheté auprès de votre société
[description précise du bien ou service] pour un montant de
[montant] euros (commande n° [numéro], facture jointe).

Or, [exposé clair du problème : produit défectueux, non
conforme, non livré, service non rendu…].

Conformément à [l'article L217-8 du Code de la consommation /
l'article 1641 du Code civil / l'article 1217 du Code civil],
je vous demande :

  - [Au choix : la réparation / le remplacement / le
  remboursement intégral de la somme de … euros]

dans un délai de 15 jours à compter de la réception du
présent courrier.

À défaut, je me réserve le droit de saisir le médiateur de
la consommation compétent, puis la juridiction civile
compétente.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]

Pièces jointes : facture, photos, échanges précédents`}</pre>
      <p>
        Pour générer la version exactement adaptée à votre achat (en ligne, en
        magasin, service), passez par notre{" "}
        <Link href="/generateur">générateur de lettres</Link>.
      </p>

      <h2>Et si la société refuse ?</h2>
      <ol>
        <li>
          <strong>Médiateur de la consommation</strong> — gratuit, obligatoire
          pour le professionnel depuis 2016 (loi du 18/12/2014). Coordonnées
          dans les CGV.
        </li>
        <li>
          <strong>SignalConso</strong> — plateforme de la DGCCRF, utile pour
          alerter les services de l&rsquo;État.
        </li>
        <li>
          <strong>Saisine du juge</strong> — tribunal judiciaire pour les
          litiges supérieurs à 5 000 €, juge des contentieux de la protection en
          dessous.
        </li>
      </ol>

      <h2>FAQ</h2>
      <h3>Le vendeur peut-il imposer un avoir au lieu d&rsquo;un
      remboursement ?</h3>
      <p>
        Non. La garantie légale ouvre droit à un remboursement en numéraire si
        la réparation et le remplacement sont impossibles ou tardent plus
        d&rsquo;un mois.
      </p>
      <h3>J&rsquo;ai acheté à l&rsquo;étranger, puis-je quand même invoquer la
      garantie ?</h3>
      <p>
        Oui pour les achats dans l&rsquo;Union européenne : la directive
        2019/771 transposée au Code de la consommation s&rsquo;applique
        partout dans l&rsquo;UE.
      </p>
      <h3>Combien de temps pour invoquer la garantie ?</h3>
      <p>
        2 ans à compter de la livraison pour la garantie légale de conformité.
        Au-delà, la garantie des vices cachés peut prendre le relais (2 ans à
        compter de la découverte).
      </p>

      <div className="cta-box">
        <h3>Réclamer en 3 minutes</h3>
        <p>
          Modèle adapté à votre situation (produit, service, livraison),
          fondement légal pré-cité, envoi en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma réclamation →
        </Link>
      </div>
    </>
  );
}
