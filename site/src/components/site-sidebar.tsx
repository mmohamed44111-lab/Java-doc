"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { docsNav, flatNav, normalizePath } from "@/lib/docs-nav";
import { ScrollArea } from "@/components/modern-ui/scroll-area";
import { Badge } from "@/components/modern-ui/badge";

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = normalizePath(usePathname());
  const currentIndex = flatNav.findIndex((i) => i.href === pathname);
  const progress =
    currentIndex >= 0 ? ((currentIndex + 1) / flatNav.length) * 100 : 0;

  return (
    <ScrollArea className="h-full py-6 pr-4">
      {/* Reading progress — Modern UI flavoured */}
      <div className="mb-6 px-2">
        <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span>Progression</span>
          <span className="tabular-nums">
            {currentIndex >= 0 ? currentIndex + 1 : 0}/{flatNav.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-2)),hsl(var(--color-3)))] bg-[length:200%_auto] animate-shine"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <nav className="flex flex-col gap-6">
        {docsNav.map((section) => (
          <div key={section.title}>
            <div className="mb-2 flex items-center gap-2 px-2 text-sm font-semibold">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                <section.icon className="size-3.5" />
              </span>
              {section.title}
            </div>
            <ul className="flex flex-col gap-0.5 border-l pl-2">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="relative">
                    {active && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute inset-0 -z-10 rounded-md bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    {active && (
                      <span className="absolute -left-[9px] top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                    )}
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-all duration-200",
                        active
                          ? "font-medium text-accent-foreground"
                          : "text-muted-foreground hover:translate-x-0.5 hover:text-foreground",
                      )}
                    >
                      {item.title}
                      {item.badge ? (
                        <Badge variant="secondary" className="text-[10px]">
                          {item.badge}
                        </Badge>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
}
