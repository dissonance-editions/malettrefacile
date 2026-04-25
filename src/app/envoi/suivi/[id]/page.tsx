"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import Breadcrumbs from "@/components/Breadcrumbs";

interface Mailing {
  id: string;
  letter_title: string;
  mail_type: string;
  status: string;
  provider_ref: string | null;
  tracking_url: string | null;
  recipient_address: { fullName: string; city: string; postalCode: string };
  created_at: string;
  sent_at: string | null;
  delivered_at: string | null;
  price_cents: number;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente de paiement",
  paid: "Payé",
  in_production: "En cours d'impression",
  sent: "Posté",
  delivered: "Distribué",
  failed: "Échec",
  refunded: "Remboursé",
};

const STATUS_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  paid: CheckCircle2,
  in_production: Loader2,
  sent: Truck,
  delivered: PackageCheck,
  failed: XCircle,
  refunded: XCircle,
};

export default function TrackingPage() {
  const params = useParams<{ id: string }>();
  const { user, loading: authLoading } = useAuth();
  const [mailing, setMailing] = useState<Mailing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading || !user || !params?.id) return;

    async function load() {
      try {
        // TODO: fetch mailing from /api/mailing/[id] with user auth
        setLoading(false);
      } catch {
        setError("Impossible de charger le suivi.");
        setLoading(false);
      }
    }
    load();
  }, [authLoading, user, params?.id]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (error || !mailing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
        <p className="text-sm text-neutral-500">
          {error || "Cet envoi est introuvable."}
        </p>
        <Link
          href="/compte"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au compte
        </Link>
      </div>
    );
  }

  const StatusIcon = STATUS_ICON[mailing.status] || Clock;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Accueil", href: "/" },
          { label: "Mon compte", href: "/compte" },
          { label: "Suivi" },
        ]}
      />

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <StatusIcon
            className={`h-6 w-6 ${
              mailing.status === "delivered"
                ? "text-success-500"
                : mailing.status === "failed"
                ? "text-red-500"
                : "text-primary-600"
            } ${mailing.status === "in_production" ? "animate-spin" : ""}`}
          />
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Statut
            </p>
            <p className="text-base font-semibold text-neutral-900">
              {STATUS_LABELS[mailing.status]}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-neutral-100 pt-6 text-sm">
          <Row label="Lettre" value={mailing.letter_title} />
          <Row label="Type d'envoi" value={mailing.mail_type} />
          <Row
            label="Destinataire"
            value={`${mailing.recipient_address.fullName} — ${mailing.recipient_address.postalCode} ${mailing.recipient_address.city}`}
          />
          {mailing.provider_ref && (
            <Row label="N° de suivi" value={mailing.provider_ref} />
          )}
          {mailing.tracking_url && (
            <Row
              label="Suivi La Poste"
              value={
                <a
                  href={mailing.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Voir le suivi →
                </a>
              }
            />
          )}
          <Row
            label="Prix"
            value={`${(mailing.price_cents / 100).toFixed(2).replace(".", ",")} €`}
          />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-neutral-500">{label}</span>
      <span className="text-neutral-800 text-right">{value}</span>
    </div>
  );
}
