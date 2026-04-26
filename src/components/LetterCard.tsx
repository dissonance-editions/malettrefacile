import Link from "next/link";
import {
  Heart,
  Wifi,
  Car,
  Smartphone,
  Home,
  Dumbbell,
  Newspaper,
  Landmark,
  CreditCard,
  PiggyBank,
  Briefcase,
  Handshake,
  FileEdit,
  Send,
  TrendingUp,
  Baby,
  CalendarOff,
  DoorOpen,
  DoorClosed,
  Wallet,
  Receipt,
  Wrench,
  ClipboardCheck,
  Building2,
  ShieldAlert,
  Calculator,
  Scale,
  UserCheck,
  ScrollText,
  FileCheck,
  Flag,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { letterIcons } from "@/data/letters";

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Wifi,
  Car,
  Smartphone,
  Home,
  Dumbbell,
  Newspaper,
  Landmark,
  CreditCard,
  PiggyBank,
  Briefcase,
  Handshake,
  FileEdit,
  Send,
  TrendingUp,
  Baby,
  CalendarOff,
  DoorOpen,
  DoorClosed,
  Wallet,
  Receipt,
  Wrench,
  ClipboardCheck,
  Building2,
  ShieldAlert,
  Calculator,
  Scale,
  UserCheck,
  ScrollText,
  FileCheck,
  Flag,
  FileText,
};

interface Props {
  title: string;
  category: string;
  slug: string;
  description?: string;
  volume?: number;
}

export default function LetterCard({
  title,
  category,
  slug,
  description,
}: Props) {
  const iconName = letterIcons[slug] || "FileText";
  const Icon = iconMap[iconName] || FileText;

  return (
    <Link
      href={`/lettres/${category}/${slug}`}
      className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
    >
      {/* Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
        <Icon className="h-5 w-5 text-primary-600" strokeWidth={1.8} />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-sm font-semibold leading-snug text-neutral-800 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 line-clamp-2">
          {description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-end pt-4">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 group-hover:gap-2 transition-all">
          Voir
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
