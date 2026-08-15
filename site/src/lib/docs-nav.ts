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
  /** Extra terms used by the command-palette search. */
  keywords?: string;
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
      {
        title: "Introduction",
        href: "/docs",
        keywords: "introduction jvm bytecode jdk présentation",
      },
      {
        title: "Installation & premier programme",
        href: "/docs/installation",
        keywords:
          "jdk javac java setup ide intellij vscode hello world premier programme",
      },
    ],
  },
  {
    title: "Les bases",
    icon: BracesIcon,
    items: [
      {
        title: "Variables & types",
        href: "/docs/variables",
        keywords:
          "types primitifs int double char boolean string var casting conversion",
      },
      {
        title: "Opérateurs",
        href: "/docs/operateurs",
        keywords:
          "arithmétique logique comparaison ternaire incrémentation modulo",
      },
      {
        title: "Structures de contrôle",
        href: "/docs/controle",
        keywords: "if else switch for while do-while boucle break continue",
      },
    ],
  },
  {
    title: "Programmation orientée objet",
    icon: BoxesIcon,
    items: [
      {
        title: "Classes & objets",
        href: "/docs/classes",
        keywords:
          "objet constructeur attribut méthode encapsulation getter setter static",
      },
      {
        title: "Héritage & polymorphisme",
        href: "/docs/heritage",
        keywords: "extends super polymorphisme override redéfinition",
      },
      {
        title: "Interfaces & abstraction",
        href: "/docs/interfaces",
        keywords: "implements abstract abstraction default méthode contrat",
      },
    ],
  },
  {
    title: "Aller plus loin",
    icon: LayersIcon,
    items: [
      {
        title: "Collections",
        href: "/docs/collections",
        keywords: "list arraylist set hashset map hashmap iterator generics",
      },
      {
        title: "Exceptions",
        href: "/docs/exceptions",
        keywords: "try catch finally throw throws checked unchecked erreur",
      },
    ],
  },
];

export const flatNav: NavItem[] = docsNav.flatMap((s) => s.items);

export function getPrevNext(pathname: string) {
  const current = normalizePath(pathname);
  const idx = flatNav.findIndex((i) => i.href === current);
  return {
    prev: idx > 0 ? flatNav[idx - 1] : null,
    next: idx >= 0 && idx < flatNav.length - 1 ? flatNav[idx + 1] : null,
  };
}

export { BookOpenIcon, CircleAlertIcon };

/**
 * `trailingSlash: true` (needed for the GitHub Pages static export) makes
 * `usePathname()` return e.g. `/docs/collections/`, so every comparison against
 * a nav href must go through this normaliser.
 */
export function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
