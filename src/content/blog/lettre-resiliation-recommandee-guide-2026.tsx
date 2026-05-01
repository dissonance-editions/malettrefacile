import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "lettre-resiliation-recommandee-guide-2026",
  title: "Lettre de résiliation en recommandé : le guide complet 2026",
  description:
    "Comment rédiger et envoyer une lettre de résiliation en recommandé en 2026 ? Délais légaux, mentions obligatoires, modèle gratuit et envoi en ligne.",
  excerpt:
    "Délais légaux, mentions obligatoires, modèle prêt à copier et astuces pour envoyer votre LRAR en quelques minutes — sans risquer de litige.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 6,
  tags: ["résiliation", "lettre recommandée", "préavis", "guide juridique"],
  category: "Guide pratique",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        La résiliation d&rsquo;un contrat par lettre recommandée reste, en 2026,
        le mode de preuve privilégié par la loi française. Que vous quittiez un
        opérateur internet, une salle de sport ou un bailleur, l&rsquo;envoi en
        LRAR (lettre recommandée avec accusé de réception) protège vos droits en
        cas de litige. On vous explique comment la rédiger sans erreur — et
        l&rsquo;envoyer en quelques minutes, sans bouger de chez vous.
      </p>

      <h2>Pourquoi un recommandé est-il (presque) toujours exigé ?</h2>
      <p>
        Quand vous résiliez un contrat, la difficulté n&rsquo;est pas tant
        d&rsquo;écrire la lettre que de <strong>prouver</strong> que vous
        l&rsquo;avez bien envoyée — et que le destinataire l&rsquo;a reçue. Un
        e-mail peut se perdre dans les spams, un appel téléphonique ne laisse
        aucune trace. La lettre recommandée avec accusé de réception (LRAR)
        donne une <strong>date certaine</strong> au sens de l&rsquo;article 1369
        du Code civil : c&rsquo;est elle qui fait courir le délai de préavis.
      </p>
      <p>
        Trois variantes existent en 2026 :
      </p>
      <ul>
        <li>
          <strong>Lettre simple</strong> — peu coûteuse mais sans valeur
          probante. À éviter sauf mention expresse du contrat.
        </li>
        <li>
          <strong>LRAR papier</strong> — la version traditionnelle, déposée à La
          Poste, ≈ 5,36 € avec AR.
        </li>
        <li>
          <strong>E-recommandé qualifié eIDAS</strong> — depuis le décret
          n° 2018-347, il a la même valeur juridique que le papier (article
          L100 du Code des postes).
        </li>
      </ul>
      <p>
        Pour la plupart des résiliations courantes — bail, assurance, mutuelle,
        salle de sport — la loi ou le contrat <strong>impose le recommandé</strong>.
        Choisir une simple lettre ou un mail revient à prendre le risque que la
        résiliation ne soit jamais opposable.
      </p>

      <h2>Les 7 mentions obligatoires d&rsquo;une lettre de résiliation</h2>
      <p>
        Une lettre de résiliation valide n&rsquo;est pas un long développement :
        c&rsquo;est un courrier court, factuel, qui contient sept éléments.
        Oubliez-en un et le destinataire pourra vous demander de la
        recommencer — donc de prolonger votre engagement d&rsquo;un mois.
      </p>
      <ol>
        <li>
          <strong>Vos coordonnées complètes</strong> (nom, prénom, adresse postale,
          e-mail, téléphone).
        </li>
        <li>
          <strong>Les coordonnées du destinataire</strong> — attention, il faut
          écrire au <em>service résiliation</em>, pas au commercial qui vous a
          vendu le contrat. L&rsquo;adresse figure dans les CGV.
        </li>
        <li>
          <strong>Le numéro de contrat ou de client</strong>, en référence en
          haut du courrier.
        </li>
        <li>
          <strong>Un objet clair</strong> : « Résiliation du contrat n° XXX ».
        </li>
        <li>
          <strong>La date d&rsquo;effet souhaitée</strong> et la mention du
          préavis applicable.
        </li>
        <li>
          <strong>Le motif</strong> (obligatoire pour certains cas : déménagement,
          perte d&rsquo;emploi, augmentation tarifaire…).
        </li>
        <li>
          <strong>Votre signature manuscrite</strong> — y compris si vous
          envoyez en e-recommandé (signature scannée acceptée).
        </li>
      </ol>

      <h2>Délais de préavis : tableau récapitulatif 2026</h2>
      <p>
        Le préavis dépend du type de contrat. Voici les délais les plus
        fréquents, à jour des dernières évolutions législatives :
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Type de contrat</th>
              <th>Préavis légal</th>
              <th>Texte de référence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bail vide (locataire)</td>
              <td>3 mois (1 mois en zone tendue)</td>
              <td>Loi du 6 juillet 1989</td>
            </tr>
            <tr>
              <td>Bail meublé</td>
              <td>1 mois</td>
              <td>Article 25-8 loi 1989</td>
            </tr>
            <tr>
              <td>Assurance auto / habitation</td>
              <td>À tout moment après 1 an</td>
              <td>Loi Hamon (2014)</td>
            </tr>
            <tr>
              <td>Mutuelle santé</td>
              <td>À tout moment après 1 an</td>
              <td>Loi du 14 juillet 2019</td>
            </tr>
            <tr>
              <td>Box internet / mobile</td>
              <td>10 jours après demande</td>
              <td>Article L224-39 Code conso</td>
            </tr>
            <tr>
              <td>Salle de sport</td>
              <td>Selon contrat (ou force majeure)</td>
              <td>Article L215-1 Code conso</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Astuce :</strong> le préavis court à compter de la{" "}
        <em>réception</em> du courrier par le destinataire — soit la date de
        l&rsquo;accusé de réception. Pas la date d&rsquo;envoi. Anticipez 2 à 5
        jours ouvrés.
      </p>

      <h2>Modèle de lettre type</h2>
      <p>
        Voici une trame neutre que vous pouvez adapter à n&rsquo;importe quel
        contrat. Pour la personnaliser automatiquement, utilisez plutôt notre{" "}
        <Link href="/generateur">générateur de lettres</Link> qui remplit les
        champs à votre place.
      </p>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]
[E-mail · Téléphone]

[Société destinataire]
[Service résiliation]
[Adresse]
[Code postal, Ville]

À [Ville], le [date]

Objet : Résiliation du contrat n° [numéro] — Lettre recommandée avec AR

Madame, Monsieur,

Par la présente, je vous notifie ma décision de résilier le contrat
référencé ci-dessus, conformément aux conditions générales et aux
dispositions légales applicables.

Je vous demande de bien vouloir prendre en compte cette résiliation
à compter du [date d'effet souhaitée], après respect du préavis
contractuel.

Je vous remercie de bien vouloir m'adresser une confirmation écrite
de la résiliation, ainsi que le décompte des sommes éventuellement
dues de part et d'autre.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations
distinguées.

[Signature]
[Prénom Nom]`}</pre>

      <h2>Comment envoyer le recommandé ?</h2>
      <p>
        Trois options s&rsquo;offrent à vous en 2026 :
      </p>
      <ul>
        <li>
          <strong>Au bureau de poste</strong> — vous remplissez un bordereau
          jaune, payez ≈ 5,36 € et conservez la preuve de dépôt. L&rsquo;AR vous
          revient sous 5 à 10 jours.
        </li>
        <li>
          <strong>En ligne via La Poste</strong> — vous tapez votre lettre, La
          Poste l&rsquo;imprime, la met sous pli et l&rsquo;achemine. Tarif
          identique au guichet.
        </li>
        <li>
          <strong>Via MaLettreFacile</strong> — vous personnalisez le modèle
          puis nous nous occupons de l&rsquo;impression et de l&rsquo;envoi en
          recommandé. Vous recevez la preuve de dépôt et l&rsquo;AR
          numérisé directement dans votre espace.
        </li>
      </ul>

      <h2>Les 5 erreurs à éviter</h2>
      <ol>
        <li>
          <strong>Oublier la date de début de préavis.</strong> Sans elle, le
          destinataire peut prolonger votre engagement.
        </li>
        <li>
          <strong>Envoyer à la mauvaise adresse.</strong> L&rsquo;adresse
          commerciale n&rsquo;est pas l&rsquo;adresse du service résiliation.
          Vérifiez les CGV.
        </li>
        <li>
          <strong>Joindre des justificatifs illisibles.</strong> Pour une
          résiliation pour motif légitime (déménagement, hospitalisation),
          envoyez une copie nette et lisible.
        </li>
        <li>
          <strong>Résilier après la date anniversaire.</strong> Pour les
          contrats tacitement reconduits (loi Châtel), respectez la fenêtre
          d&rsquo;ouverture indiquée sur l&rsquo;avis d&rsquo;échéance.
        </li>
        <li>
          <strong>Jeter l&rsquo;accusé de réception.</strong> Conservez-le 5 ans
          minimum : c&rsquo;est votre seule preuve en cas de litige.
        </li>
      </ol>

      <h2>FAQ</h2>

      <h3>Une lettre simple suffit-elle pour résilier ?</h3>
      <p>
        Non, dès lors que la loi ou le contrat impose le recommandé. Un envoi
        simple peut être contesté par le destinataire qui prétendra ne
        l&rsquo;avoir jamais reçu — vous perdez alors la preuve de la date
        d&rsquo;envoi.
      </p>

      <h3>Combien de temps pour recevoir l&rsquo;accusé de réception ?</h3>
      <p>
        Comptez 2 à 5 jours ouvrés en France métropolitaine. Si l&rsquo;AR ne
        vous revient pas sous 15 jours, contactez La Poste avec votre numéro de
        suivi.
      </p>

      <h3>Que faire si le destinataire refuse le pli ?</h3>
      <p>
        L&rsquo;accusé portera la mention « pli refusé » : juridiquement, cela
        vaut <strong>réception</strong>. Le préavis commence à courir.
      </p>

      <h3>Peut-on résilier par mail en 2026 ?</h3>
      <p>
        Oui, depuis la mise en place de la « résiliation en 3 clics » (juin
        2023) pour tous les contrats de consommation souscrits par voie
        électronique : assurance, mutuelle, abonnements internet/mobile,
        streaming. Pour les autres (bail, salle de sport en agence…), le
        recommandé reste recommandé.
      </p>

      <h3>L&rsquo;e-recommandé a-t-il la même valeur que le papier ?</h3>
      <p>
        Oui, à condition qu&rsquo;il soit <strong>qualifié eIDAS</strong>. Les
        services de La Poste, AR24 et Maileva entrent dans cette catégorie. Un
        simple mail avec accusé de lecture ne suffit pas.
      </p>

      <div className="cta-box">
        <h3>Rédigez votre lettre en 2 minutes</h3>
        <p>
          Notre générateur remplit les mentions obligatoires, calcule le préavis
          applicable et vous propose l&rsquo;envoi en recommandé sans bouger de
          chez vous.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma lettre de résiliation →
        </Link>
      </div>
    </>
  );
}
