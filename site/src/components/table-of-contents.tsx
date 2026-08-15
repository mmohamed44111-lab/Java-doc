"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ListIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: number };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Auto-generated "On this page" nav with scroll-spy. */
export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = React.useState<Heading[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | undefined;

    // Headings are rendered by the server component tree; read them after paint.
    const frame = requestAnimationFrame(() => {
      if (cancelled) return;
      const nodes = Array.from(
        document.querySelectorAll<HTMLHeadingElement>("article h2, article h3"),
      );

      const found = nodes.map((node) => {
        if (!node.id) node.id = slugify(node.textContent ?? "");
        return {
          id: node.id,
          text: node.textContent ?? "",
          level: node.tagName === "H2" ? 2 : 3,
        };
      });
      setHeadings(found);

      if (found.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );
          if (visible[0]) setActiveId(visible[0].target.id);
        },
        { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] },
      );

      nodes.forEach((n) => observer?.observe(n));
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Sommaire de la page" className="text-sm">
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <ListIcon className="size-4 text-primary" />
        Sur cette page
      </div>
      <ul className="flex flex-col gap-0.5 border-l">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id} className="relative">
              {active && (
                <motion.span
                  layoutId="toc-active"
                  className="absolute -left-px top-0 h-full w-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <a
                href={`#${h.id}`}
                className={cn(
                  "block py-1.5 pl-3 pr-2 leading-snug transition-colors",
                  h.level === 3 && "pl-6 text-[13px]",
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
