import type { LucideIcon } from "lucide-react";
import {
  BookOpenIcon,
  BoxesIcon,
  BracesIcon,
  CircleAlertIcon,
  LayersIcon,
  RocketIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  badge?: string;
};

export type NavSection = {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
};

export const docsNav: NavSection[] = [
  {
    title: "Démarrage",
    icon: RocketIcon,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation & premier programme", href: "/docs/installation" },
    ],
  },
  {
    title: "Les bases",
    icon: BracesIcon,
    items: [
      { title: "Variables & types", href: "/docs/variables" },
      { title: "Opérateurs", href: "/docs/operateurs" },
      { title: "Structures de contrôle", href: "/docs/controle" },
    ],
  },
  {
    title: "Programmation orientée objet",
    icon: BoxesIcon,
    items: [
      { title: "Classes & objets", href: "/docs/classes" },
      { title: "Héritage & polymorphisme", href: "/docs/heritage" },
      { title: "Interfaces & abstraction", href: "/docs/interfaces" },
    ],
  },
  {
    title: "Aller plus loin",
    icon: LayersIcon,
    items: [
      { title: "Collections", href: "/docs/collections" },
      { title: "Exceptions", href: "/docs/exceptions" },
    ],
  },
];

export const flatNav: NavItem[] = docsNav.flatMap((s) => s.items);

export function getPrevNext(pathname: string) {
  const idx = flatNav.findIndex((i) => i.href === pathname);
  return {
    prev: idx > 0 ? flatNav[idx - 1] : null,
    next: idx >= 0 && idx < flatNav.length - 1 ? flatNav[idx + 1] : null,
  };
}

export { BookOpenIcon, CircleAlertIcon };
