import Link from "next/link";
import type { BlogPostMeta } from "@/data/blog";

export const meta: BlogPostMeta = {
  slug: "contester-amende-forfait-post-stationnement-2026",
  title: "Contester une amende ou un FPS : guide et modèle 2026",
  description:
    "Comment contester une amende ou un forfait post-stationnement (FPS) en 2026 : motifs recevables, délais, modèle de lettre, RAPO et CCSP.",
  excerpt:
    "Délais, motifs recevables, RAPO, CCSP : la procédure complète pour contester une amende ou un FPS sans payer d'abord — et un modèle prêt à envoyer.",
  author: "Lettre Facile",
  publishedAt: "2026-05-02",
  updatedAt: "2026-05-02",
  readingMinutes: 6,
  tags: ["amende", "FPS", "stationnement", "contestation", "RAPO"],
  category: "Administratif",
};

export default function Article() {
  return (
    <>
      <p className="lead">
        Une amende au pare-brise ou un FPS à 35 € qui devient 75 € puis 165 €
        après majoration : la contestation reste possible — à condition de
        respecter des délais courts et la bonne procédure. Voici comment
        contester sans payer d&rsquo;abord, en 2026.
      </p>

      <h2>Amende ou FPS : ce n&rsquo;est pas la même chose</h2>
      <p>
        Depuis la décentralisation du stationnement payant en 2018, deux régimes
        coexistent :
      </p>
      <ul>
        <li>
          <strong>L&rsquo;amende forfaitaire</strong> (excès de vitesse,
          stationnement gênant, feu rouge…) — sanction pénale, gérée par
          l&rsquo;ANTAI. Procédure de l&rsquo;article 529-2 du Code de procédure
          pénale.
        </li>
        <li>
          <strong>Le forfait post-stationnement (FPS)</strong> — redevance
          domaniale émise par la commune en cas de non-paiement du
          stationnement payant. Procédure devant la{" "}
          <strong>Commission du contentieux du stationnement payant
          (CCSP)</strong>.
        </li>
      </ul>

      <h2>Les délais à connaître</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Procédure</th>
              <th>Délai</th>
              <th>Point de départ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amende forfaitaire (contestation)</td>
              <td>45 jours</td>
              <td>Avis de contravention</td>
            </tr>
            <tr>
              <td>Amende forfaitaire majorée</td>
              <td>30 jours</td>
              <td>Notification de majoration</td>
            </tr>
            <tr>
              <td>FPS — RAPO</td>
              <td>1 mois</td>
              <td>Notification de l&rsquo;avis</td>
            </tr>
            <tr>
              <td>FPS — recours CCSP</td>
              <td>1 mois</td>
              <td>Réponse au RAPO (ou silence)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Motifs de contestation recevables</h2>
      <ul>
        <li>
          <strong>Erreur matérielle</strong> sur la plaque, le lieu ou
          l&rsquo;heure.
        </li>
        <li>
          <strong>Véhicule volé, vendu ou prêté</strong> (joindre déclaration de
          vol, certificat de cession, attestation du conducteur réel).
        </li>
        <li>
          <strong>Cas de force majeure</strong> (panne, urgence médicale).
        </li>
        <li>
          <strong>Signalisation absente, illisible ou non conforme</strong>{" "}
          (photo à l&rsquo;appui).
        </li>
        <li>
          <strong>Paiement effectué</strong> mais non enregistré (ticket,
          paiement par appli).
        </li>
      </ul>
      <p>
        Pour le FPS, la contestation passe d&rsquo;abord par un{" "}
        <strong>RAPO (recours administratif préalable obligatoire)</strong>{" "}
        adressé à l&rsquo;autorité émettrice — généralement la mairie ou le
        prestataire. En cas de rejet ou de silence pendant 1 mois, vous pouvez
        saisir la CCSP.
      </p>

      <h2>Modèle de RAPO (FPS)</h2>
      <pre className="letter-block">{`[Vos prénom et nom]
[Adresse]
[Code postal, Ville]

[Autorité émettrice du FPS]
Service contentieux
[Adresse]

À [Ville], le [date]

Objet : Recours administratif préalable obligatoire (RAPO)
contre le FPS n° [numéro]
Lettre recommandée avec AR

Madame, Monsieur,

J'ai reçu le [date de notification] un avis de paiement pour
un forfait post-stationnement n° [numéro], émis le [date] à
[lieu], pour un montant de [montant] euros.

Je conteste cet avis pour le motif suivant :

  [Exposer clairement : ticket payé / véhicule cédé / panne /
  signalisation défaillante…]

À l'appui de ma demande, je joins les pièces suivantes :

  - [pièce 1]
  - [pièce 2]

Je vous demande, en application de l'article L2333-87-1 du
Code général des collectivités territoriales, l'annulation
pure et simple de ce forfait.

Je vous prie d'agréer, Madame, Monsieur, mes salutations
distinguées.

[Signature]
[Prénom Nom]

Pièces jointes : [liste]`}</pre>
      <p>
        Le générateur produit une version adaptée à votre cas (amende
        forfaitaire ou FPS) avec les pièces à joindre :{" "}
        <Link href="/generateur">créer ma contestation</Link>.
      </p>

      <h2>Faut-il payer avant de contester ?</h2>
      <p>
        Pour le <strong>FPS</strong>, la règle du « paiement préalable » a été
        censurée par le Conseil constitutionnel (décision QPC du 9 septembre
        2020). Vous pouvez désormais contester sans payer.
      </p>
      <p>
        Pour une <strong>amende forfaitaire</strong>, ne payez pas si vous
        contestez : le paiement vaut reconnaissance de l&rsquo;infraction et
        clôt définitivement la procédure.
      </p>

      <h2>FAQ</h2>
      <h3>Que faire si on ne me répond pas ?</h3>
      <p>
        Pour le RAPO, le silence pendant 1 mois vaut rejet implicite. Vous
        disposez alors d&rsquo;1 mois pour saisir la CCSP.
      </p>
      <h3>Puis-je contester une amende reçue par procuration ?</h3>
      <p>
        Oui, en désignant le conducteur réel via le formulaire de requête en
        exonération joint à l&rsquo;avis.
      </p>
      <h3>La CCSP est-elle gratuite ?</h3>
      <p>
        Oui, mais elle exige la consignation préalable du montant du FPS, sauf
        si vous bénéficiez de l&rsquo;aide juridictionnelle.
      </p>

      <div className="cta-box">
        <h3>Contester en 3 minutes</h3>
        <p>
          Modèle pré-rempli amende ou FPS, pièces à joindre listées, envoi en
          recommandé inclus.
        </p>
        <Link href="/generateur" className="cta-button">
          Créer ma contestation →
        </Link>
      </div>
    </>
  );
}
