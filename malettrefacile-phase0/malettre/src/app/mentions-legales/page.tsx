import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales, CGV et politique de confidentialité du site MaLettreFacile.fr.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Mentions légales" },
        ]}
      />

      <h1 className="mt-6 text-2xl font-bold text-neutral-900">
        Mentions légales
      </h1>

      <div className="mt-8 space-y-10 text-sm leading-relaxed text-neutral-600">
        {/* Éditeur */}
        <section>
          <h2 className="text-base font-bold text-neutral-800">Éditeur</h2>
          <div className="mt-2 space-y-1">
            <p>MARCANT SAS</p>
            <p>SIRET : [À COMPLÉTER]</p>
            <p>Siège social : [Adresse à compléter]</p>
            <p>Directeur de la publication : [Nom à compléter]</p>
            <p>Email : contact@malettrefacile.fr</p>
          </div>
        </section>

        {/* Hébergeur */}
        <section>
          <h2 className="text-base font-bold text-neutral-800">Hébergeur</h2>
          <div className="mt-2 space-y-1">
            <p>Vercel Inc.</p>
            <p>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
          </div>
        </section>

        {/* CGV */}
        <section id="cgv">
          <h2 className="text-base font-bold text-neutral-800">
            Conditions générales de vente
          </h2>
          <div className="mt-2 space-y-3">
            <p>
              Le service MaLettreFacile propose un accès gratuit à des modèles de
              lettres types, ainsi qu'un service payant de personnalisation par
              intelligence artificielle et d'export PDF.
            </p>
            <p>
              Le paiement est effectué via la plateforme sécurisée Stripe. Le
              service à l'unité (1,99€) donne accès à une génération IA et un
              export PDF. L'abonnement Premium (4,99€/mois) donne accès à un
              nombre illimité de générations et d'exports.
            </p>
            <p>
              L'abonnement Premium est sans engagement et peut être résilié à
              tout moment depuis l'espace client ou par email à
              contact@malettrefacile.fr. La résiliation prend effet à la fin de la
              période en cours.
            </p>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le
              droit de rétractation ne s'applique pas à la fourniture de contenu
              numérique non fourni sur un support matériel dont l'exécution a
              commencé avec l'accord préalable du consommateur.
            </p>
          </div>
        </section>

        {/* Confidentialité */}
        <section id="confidentialite">
          <h2 className="text-base font-bold text-neutral-800">
            Politique de confidentialité
          </h2>
          <div className="mt-2 space-y-3">
            <p>
              Les données personnelles saisies dans le générateur IA (nom,
              adresse, etc.) sont traitées uniquement pour la génération de la
              lettre demandée. Elles ne sont ni conservées, ni transmises à des
              tiers, sauf dans le cadre de l'abonnement Premium (historique des
              lettres stocké de manière chiffrée).
            </p>
            <p>
              Le site utilise Plausible Analytics, un outil d'analyse
              respectueux de la vie privée qui ne dépose aucun cookie et ne
              collecte aucune donnée personnelle.
            </p>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de
              rectification, de suppression et de portabilité de vos données.
              Pour exercer ces droits, contactez-nous à contact@malettrefacile.fr.
            </p>
            <p>
              Responsable du traitement : MARCANT SAS.
            </p>
          </div>
        </section>

        {/* Médiation */}
        <section>
          <h2 className="text-base font-bold text-neutral-800">
            Médiation de la consommation
          </h2>
          <p className="mt-2">
            Conformément aux articles L611-1 et suivants du Code de la
            consommation, le consommateur peut recourir gratuitement au service
            de médiation suivant : [Nom et coordonnées du médiateur à
            compléter].
          </p>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-base font-bold text-neutral-800">
            Responsabilité
          </h2>
          <p className="mt-2">
            Les modèles de lettres proposés sur ce site sont fournis à titre
            informatif et ne constituent en aucun cas un conseil juridique. Ils
            sont rédigés sur la base de la législation en vigueur et peuvent ne
            pas couvrir toutes les situations particulières. En cas de doute ou
            de situation complexe, il est recommandé de consulter un
            professionnel du droit.
          </p>
        </section>
      </div>
    </div>
  );
}
