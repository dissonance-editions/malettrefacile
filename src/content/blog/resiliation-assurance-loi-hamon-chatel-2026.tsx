import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "resiliation-assurance-loi-hamon-chatel-2026",
  title: "Résilier son assurance : loi Hamon, Châtel et modèle 2026",
  description:
    "Résiliation d'assurance auto, habitation, santé en 2026 : loi Hamon, loi Châtel, résiliation infra-annuelle, modèle de lettre et démarches.",
  excerpt:
    "Loi Hamon, loi Châtel, résiliation infra-annuelle santé : quel dispositif utiliser pour résilier votre assurance, et un modèle adapté à chaque cas.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["assurance", "loi Hamon", "loi Châtel", "résiliation", "mutuelle"],
  category: "Résiliation",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Résilier son assurance auto, habitation ou santé est devenu
        considérablement plus simple grâce à trois lois successives : Châtel
        (2005), Hamon (2014) et la loi du 14 juillet 2019 sur la résiliation
        infra-annuelle des complémentaires santé. Voici quel dispositif utiliser
        selon votre situation, et un modèle de lettre.
      </p>

      <h2>Trois dispositifs, trois usages</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Loi</th>
              <th>Quand</th>
              <th>Pour qui</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Loi Châtel</td>
              <td>À l&rsquo;échéance annuelle</td>
              <td>Tous contrats à tacite reconduction</td>
            </tr>
            <tr>
              <td>Loi Hamon</td>
              <td>À tout moment après 1 an</td>
              <td>Auto, moto, habitation, affinitaires</td>
            </tr>
            <tr>
              <td>Loi du 14 juillet 2019</td>
              <td>À tout moment après 1 an</td>
              <td>Mutuelle santé / complémentaire</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Loi Châtel : la fenêtre annuelle</h2>
      <p>
        La <strong>loi du 28 janvier 2005</strong> oblige l&rsquo;assureur à
        rappeler la date limite de résiliation au moins 15 jours avant son
        expiration. Si l&rsquo;avis arrive moins de 15 jours avant cette date —
        ou pas du tout — vous disposez de <strong>20 jours</strong> à compter
        de l&rsquo;envoi de l&rsquo;avis pour résilier.
      </p>
      <p>
        En pratique : dès réception de votre avis d&rsquo;échéance, regardez la
        date d&rsquo;échéance annuelle et envoyez votre LRAR au plus tard 2 mois
        avant (sauf délai conventionnel plus court).
      </p>

      <h2>Loi Hamon : à tout moment après 1 an</h2>
      <p>
        Depuis la <strong>loi du 17 mars 2014</strong>, vous pouvez résilier à
        tout moment, sans frais ni motif, votre assurance{" "}
        <strong>auto, moto, habitation</strong> et les contrats affinitaires
        (téléphone, électroménager…) après <strong>12 mois</strong> de
        souscription.
      </p>
      <p>
        Pour l&rsquo;assurance habitation et auto obligatoire, c&rsquo;est{" "}
        <strong>le nouvel assureur</strong> qui se charge de la résiliation
        auprès de l&rsquo;ancien — vous lui donnez mandat. Pour les contrats
        non obligatoires, vous résiliez vous-même par LRAR.
      </p>

      <h2>Loi du 14 juillet 2019 : la mutuelle santé</h2>
      <p>
        Depuis le <strong>1er décembre 2020</strong>, vous pouvez résilier à
        tout moment votre complémentaire santé (mutuelle ou contrat collectif
        d&rsquo;entreprise quitté) après 1 an de souscription. Mêmes règles que
        la loi Hamon : effet 1 mois après réception, gratuit, sans motif.
      </p>

      <h2>Modèle de lettre de résiliation (loi Hamon / 2019)</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]
[Numéro de contrat]

[Compagnie d'assurance]
Service résiliation
[Adresse]

À [Ville], le [date]

Objet : Résiliation du contrat n° [numéro] —
[Loi Hamon / Loi du 14 juillet 2019]
Lettre recommandée avec AR

Madame, Monsieur,

Conformément à [l'article L113-15-2 du Code des assurances /
l'article L113-15-2 du Code de la mutualité], je vous notifie
ma décision de résilier le contrat référencé ci-dessus,
souscrit le [date de souscription], dont la durée
d'engagement minimale d'un an est échue.

La résiliation prendra effet 1 mois après la réception de
ce courrier.

Je vous remercie de m'adresser une confirmation écrite et de
me rembourser, le cas échéant, la fraction de prime
correspondant à la période non courue.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Pour la version Châtel, modifiez l&rsquo;objet et la base légale (article
        L113-15-1 du Code des assurances). Notre{" "}
        <Link href="/generateur">générateur</Link> détecte automatiquement la
        loi applicable selon le contrat.
      </p>

      <h2>FAQ</h2>
      <h3>Mon assureur peut-il refuser ma résiliation Hamon ?</h3>
      <p>
        Non, dès lors que vous avez plus d&rsquo;un an d&rsquo;ancienneté. Tout
        refus expose l&rsquo;assureur à une amende administrative (article
        L113-15-2).
      </p>
      <h3>Que faire de la fraction de prime payée d&rsquo;avance ?</h3>
      <p>
        L&rsquo;assureur est tenu de vous la rembourser au prorata sous 30 jours
        à compter de la date d&rsquo;effet de la résiliation.
      </p>
      <h3>Et si je change de véhicule ou de logement ?</h3>
      <p>
        Vous pouvez résilier à tout moment, sans condition d&rsquo;ancienneté,
        en justifiant du changement (carte grise, bail).
      </p>

      <div className="cta-box">
        <h3>Résilier en 2 minutes</h3>
        <p>
          Choix automatique de la loi applicable (Châtel, Hamon, 2019), envoi
          en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Résilier mon assurance →
        </Link>
      </div>
    </>
  );
}
