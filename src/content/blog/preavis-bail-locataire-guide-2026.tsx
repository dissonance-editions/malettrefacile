import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "preavis-bail-locataire-guide-2026",
  title: "Préavis de bail locataire : durée, modèle et zone tendue (2026)",
  description:
    "Préavis de bail en 2026 : 3 mois ou 1 mois en zone tendue ? Cas de réduction, modèle de lettre de préavis et procédure complète pour locataire.",
  excerpt:
    "3 mois ou 1 mois ? Zone tendue, motifs de réduction, point de départ du préavis, restitution du dépôt de garantie : tout pour quitter un logement sans accroc.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 6,
  tags: [
    "bail",
    "préavis",
    "logement",
    "zone tendue",
    "locataire",
    "loi 1989",
  ],
  category: "Immobilier & Logement",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Quitter un logement loué suppose de respecter un préavis fixé par la loi
        du 6 juillet 1989. Sa durée — 3 mois ou 1 mois — change selon le type
        de bail, la zone et votre situation personnelle. Voici les règles 2026,
        un modèle de lettre, et les pièges à éviter.
      </p>

      <h2>Préavis 3 mois ou 1 mois ?</h2>
      <p>
        Le principe par défaut est de <strong>3 mois</strong> pour un bail vide
        (article 15-I de la loi du 6/7/1989) et <strong>1 mois</strong> pour
        un bail meublé. Le préavis est ramené à <strong>1 mois</strong> dans
        plusieurs cas :
      </p>
      <ul>
        <li>
          <strong>Logement situé en zone tendue</strong> (décret n° 2013-392, mis
          à jour en 2023, qui couvre 1 149 communes : Paris, Lyon, Toulouse,
          Bordeaux, Nantes, métropoles…).
        </li>
        <li>
          <strong>Mutation professionnelle</strong> ou premier emploi.
        </li>
        <li>
          <strong>Perte d&rsquo;emploi</strong> (licenciement, fin de CDD non
          suivie de contrat).
        </li>
        <li>
          <strong>État de santé</strong> justifiant un déménagement (certificat
          médical).
        </li>
        <li>
          <strong>Bénéficiaires du RSA ou de l&rsquo;AAH</strong>.
        </li>
        <li>
          <strong>Attribution d&rsquo;un logement social</strong>.
        </li>
        <li>
          <strong>Violences conjugales</strong> (loi du 6 juillet 2010).
        </li>
      </ul>
      <p>
        Pour les motifs personnels, joignez systématiquement le justificatif :
        sans lui, le bailleur peut exiger les 3 mois.
      </p>

      <h2>Quand le préavis commence-t-il ?</h2>
      <p>
        Le point de départ est la <strong>date de réception</strong> de la
        lettre par le bailleur (et non la date d&rsquo;envoi). C&rsquo;est l&rsquo;une
        des raisons pour lesquelles l&rsquo;envoi en LRAR est fortement
        recommandé : l&rsquo;accusé de réception fait foi.
      </p>
      <p>
        Trois modes de notification sont admis :
      </p>
      <ul>
        <li>Lettre recommandée avec AR.</li>
        <li>Acte de commissaire de justice (anciennement huissier).</li>
        <li>Remise en main propre contre récépissé daté et signé.</li>
      </ul>
      <p>
        Pendant le préavis, vous restez tenu au paiement du loyer et des
        charges, et le bailleur peut faire visiter le logement (2 h par jour
        ouvrable, sauf accord contraire).
      </p>

      <h2>Modèle de lettre de préavis</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse du logement loué]
[Code postal, Ville]

[Bailleur ou agence]
[Adresse]
[Code postal, Ville]

À [Ville], le [date]

Objet : Préavis de départ — Bail du [date du bail] — Lettre
recommandée avec AR

Madame, Monsieur,

Par la présente, je vous donne congé du logement situé
[adresse complète], que j'occupe depuis le [date d'entrée]
en vertu du bail signé le [date du bail].

Conformément à l'article 15-I de la loi du 6 juillet 1989,
mon préavis de [1 mois / 3 mois] court à compter de la
réception du présent courrier. Mon départ effectif est donc
prévu au plus tard le [date d'effet].

[Si préavis réduit :] Le préavis réduit à 1 mois s'applique
au titre de [motif : zone tendue / mutation / perte d'emploi…],
comme en atteste le justificatif joint.

Je vous propose de fixer ensemble la date de l'état des lieux
de sortie. Je vous remercie également de me restituer le dépôt
de garantie dans les délais légaux (1 mois si l'état des lieux
de sortie est conforme à celui d'entrée, 2 mois sinon).

Je vous prie d'agréer, Madame, Monsieur, mes salutations
distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Pour le générer pré-rempli avec votre adresse et le bon motif, passez
        par notre <Link href="/generateur">générateur de lettres</Link>.
      </p>

      <h2>Et après le préavis ?</h2>
      <ul>
        <li>
          <strong>État des lieux de sortie</strong> contradictoire, idéalement
          avec photos.
        </li>
        <li>
          <strong>Restitution des clés</strong> contre reçu.
        </li>
        <li>
          <strong>Dépôt de garantie</strong> à restituer sous{" "}
          <strong>1 mois</strong> si l&rsquo;état des lieux est conforme,{" "}
          <strong>2 mois</strong> en cas de retenues. Au-delà, intérêts au taux
          légal majoré de 10 % par mois de retard.
        </li>
      </ul>

      <h2>FAQ</h2>
      <h3>Comment savoir si je suis en zone tendue ?</h3>
      <p>
        Le simulateur officiel sur service-public.fr permet de vérifier votre
        commune. La zone tendue couvre les agglomérations de plus de 50 000
        habitants où l&rsquo;offre est saturée.
      </p>
      <h3>Puis-je partir avant la fin du préavis ?</h3>
      <p>
        Oui si le bailleur l&rsquo;accepte par écrit, ou si un nouveau locataire
        prend possession du logement avant la fin du préavis (avec l&rsquo;accord
        du bailleur). Sinon, le loyer reste dû jusqu&rsquo;au terme.
      </p>
      <h3>Le bailleur refuse mon préavis réduit, que faire ?</h3>
      <p>
        Vérifiez d&rsquo;abord que votre justificatif est conforme. En cas de
        désaccord persistant, saisissez la commission départementale de
        conciliation, gratuite et préalable à toute action judiciaire.
      </p>
      <h3>Et en colocation ?</h3>
      <p>
        Si vous êtes seul signataire qui part, votre préavis ne libère que vous
        — les colocataires restent tenus. Avec une clause de solidarité, vous
        restez engagé jusqu&rsquo;à 6 mois après votre départ ou
        l&rsquo;arrivée d&rsquo;un nouveau colocataire.
      </p>

      <div className="cta-box">
        <h3>Rédigez votre préavis en 2 minutes</h3>
        <p>
          Détection automatique de la zone tendue, motifs de préavis réduit
          pré-cochés, envoi en recommandé en 1 clic.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma lettre de préavis →
        </Link>
      </div>
    </>
  );
}
