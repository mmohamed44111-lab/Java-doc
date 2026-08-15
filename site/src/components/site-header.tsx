"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CoffeeIcon, MenuIcon } from "lucide-react";
import { motion } from "motion/react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

import { Button } from "@/components/modern-ui/button";
import { Badge } from "@/components/modern-ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/modern-ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/modern-ui/tooltip";
import { SidebarNav } from "@/components/site-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { DocsSearch } from "@/components/docs-search";
import { cn } from "@/lib/utils";
import { normalizePath } from "@/lib/docs-nav";

const navLinks = [
  { href: "/docs", label: "Documentation" },
  { href: "/docs/installation", label: "Démarrage rapide" },
  { href: "/docs/collections", label: "Collections" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = normalizePath(usePathname());

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-border bg-background/70 shadow-xs backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
          : "bg-background/40 backdrop-blur-sm",
      )}
    >
      {/* Modern UI style animated top accent line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px animate-shine bg-[linear-gradient(90deg,transparent,hsl(var(--color-1)),hsl(var(--color-3)),hsl(var(--color-2)),transparent)] bg-[length:200%_auto] opacity-60"
      />
      <div className="mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-3 px-4 md:px-8">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="size-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle className="flex items-center gap-2">
                <CoffeeIcon className="size-5 text-primary" />
                Manuel Java
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100svh-5rem)] overflow-y-auto px-4 pb-6">
              <SidebarNav onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="group flex items-center gap-2 font-semibold">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-xs"
          >
            <CoffeeIcon className="size-4" />
          </motion.span>
          <span className="hidden sm:inline">Manuel Java</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            v1.0
          </Badge>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="header-nav-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <DocsSearch />
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com/mmohamed44111-lab/Java-doc"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="size-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code source sur GitHub</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
