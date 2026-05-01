import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "lettre-demission-cdi-guide-2026",
  title: "Lettre de démission CDI : modèle et règles 2026",
  description:
    "Lettre de démission en CDI : préavis, mentions obligatoires, modèle gratuit, dispense de préavis et droits au chômage. Guide à jour 2026.",
  excerpt:
    "Préavis, mentions obligatoires, dispense possible, droits au chômage : tout ce qu'il faut savoir avant d'envoyer votre démission — et un modèle prêt à l'emploi.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 5,
  tags: ["démission", "CDI", "emploi", "préavis", "code du travail"],
  category: "Emploi & Travail",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Démissionner d&rsquo;un CDI ne s&rsquo;improvise pas : la lettre est
        votre acte juridique. Mal rédigée, elle peut être contestée, requalifiée
        ou vous priver d&rsquo;un préavis pourtant négociable. Voici le cadre
        légal 2026 et un modèle à copier.
      </p>

      <h2>Démission : un acte unilatéral et clair</h2>
      <p>
        La jurisprudence l&rsquo;a posé fermement (Cass. soc., 9 mai 2007) : la
        démission doit résulter d&rsquo;une volonté <strong>claire et non
        équivoque</strong>. Un mail vague, un coup de colère ou une absence
        prolongée ne valent pas démission. Pour éviter toute contestation,
        privilégiez l&rsquo;écrit — idéalement la lettre recommandée avec AR.
      </p>
      <p>
        Le Code du travail n&rsquo;impose pas de motif : vous n&rsquo;avez pas à
        justifier votre décision. Vous devez en revanche respecter le préavis
        prévu par la convention collective ou les usages.
      </p>

      <h2>Préavis : combien de temps ?</h2>
      <p>
        Le préavis dépend de votre statut et de votre convention collective :
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Statut</th>
              <th>Préavis usuel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Employé / ouvrier</td>
              <td>1 mois (selon CCN)</td>
            </tr>
            <tr>
              <td>Agent de maîtrise / technicien</td>
              <td>2 mois</td>
            </tr>
            <tr>
              <td>Cadre</td>
              <td>3 mois</td>
            </tr>
            <tr>
              <td>Période d&rsquo;essai</td>
              <td>24 h à 48 h selon ancienneté</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Le préavis court à compter de la <strong>réception</strong> de la lettre
        par l&rsquo;employeur. Vous pouvez demander une dispense : si elle est
        accordée, vous partez plus tôt sans rémunération du préavis. Si
        l&rsquo;employeur refuse mais ne vous fait pas travailler, il doit vous
        payer le préavis.
      </p>

      <h2>Modèle de lettre de démission</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]

[Société]
À l'attention du service RH
[Adresse]
[Code postal, Ville]

À [Ville], le [date]

Objet : Démission — Lettre recommandée avec AR

Madame, Monsieur,

Par la présente, je vous notifie ma démission du poste de
[intitulé du poste] que j'occupe au sein de [Société] depuis
le [date d'embauche].

Conformément à mon contrat de travail et à la convention collective
applicable, mon préavis de [durée] débutera à compter de la réception
de ce courrier. Mon dernier jour de travail sera donc le [date].

Je vous remercie de bien vouloir me remettre, à l'issue de ce préavis,
mon solde de tout compte, mon certificat de travail et l'attestation
destinée à France Travail.

Je vous prie d'agréer, Madame, Monsieur, l'expression de mes
salutations distinguées.

[Signature]
[Prénom Nom]`}</pre>
      <p>
        Pour une version personnalisée à votre convention collective et à votre
        date de départ, utilisez notre{" "}
        <Link href="/generateur">générateur de lettres</Link>.
      </p>

      <h2>Démission et chômage : le piège</h2>
      <p>
        Une démission « simple » <strong>n&rsquo;ouvre pas droit aux
        allocations</strong> France Travail. Trois exceptions :
      </p>
      <ul>
        <li>
          <strong>Démissions légitimes</strong> reconnues par France Travail
          (suivi de conjoint, mariage, non-paiement du salaire, victime de
          violences…).
        </li>
        <li>
          <strong>Réexamen après 121 jours</strong> de chômage : vous pouvez
          demander un examen de votre situation par l&rsquo;IPR.
        </li>
        <li>
          <strong>Démission pour reconversion</strong> (loi Avenir
          professionnel, 2019) : sous conditions de projet validé par
          Transitions Pro.
        </li>
      </ul>
      <p>
        Si vous hésitez, comparez avec la <Link href="/blog/rupture-conventionnelle-demande-guide-2026">rupture
        conventionnelle</Link> : elle ouvre droit au chômage et permet de
        négocier une indemnité.
      </p>

      <h2>FAQ</h2>
      <h3>Puis-je démissionner par mail ?</h3>
      <p>
        Juridiquement oui (la forme libre), mais la LRAR reste fortement
        recommandée pour dater la réception et faire courir le préavis sans
        ambiguïté.
      </p>
      <h3>Puis-je rétracter ma démission ?</h3>
      <p>
        Uniquement avec l&rsquo;accord de l&rsquo;employeur — sauf si la
        démission a été donnée sous le coup de l&rsquo;émotion ou de la
        contrainte, auquel cas le juge peut la requalifier en prise
        d&rsquo;acte.
      </p>
      <h3>Que se passe-t-il si je ne respecte pas le préavis ?</h3>
      <p>
        L&rsquo;employeur peut vous demander des dommages-intérêts équivalents
        au salaire du préavis non effectué.
      </p>
      <h3>L&rsquo;employeur peut-il me faire partir avant ?</h3>
      <p>
        Oui s&rsquo;il vous dispense de préavis. Dans ce cas, il doit vous
        verser une indemnité compensatrice équivalente au préavis non travaillé,
        sauf s&rsquo;il s&rsquo;agit d&rsquo;une dispense à votre demande.
      </p>

      <div className="cta-box">
        <h3>Rédigez votre démission en 2 minutes</h3>
        <p>
          Lettre conforme à votre convention collective, calcul automatique du
          préavis, envoi en recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma lettre de démission →
        </Link>
      </div>
    </>
  );
}
