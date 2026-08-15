"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { getPrevNext, docsNav, flatNav, normalizePath } from "@/lib/docs-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/modern-ui/breadcrumb";
import { Badge } from "@/components/modern-ui/badge";

export function Breadcrumbs() {
  const pathname = normalizePath(usePathname());
  const section = docsNav.find((s) => s.items.some((i) => i.href === pathname));
  const item = section?.items.find((i) => i.href === pathname);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/docs"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {section ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-sm text-muted-foreground">
                {section.title}
              </span>
            </BreadcrumbItem>
          </>
        ) : null}
        {item ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function PrevNext() {
  const pathname = normalizePath(usePathname());
  const { prev, next } = getPrevNext(pathname);

  return (
    <div className="mt-14">
      <div className="mb-6 h-px w-full bg-[linear-gradient(90deg,transparent,var(--border),transparent)]" />
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <ChevronLeftIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-x-0.5 group-hover:text-primary" />
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">Précédent</span>
              <span className="truncate font-medium">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-background p-4 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:col-start-2"
          >
            <span className="flex min-w-0 flex-col">
              <span className="text-xs text-muted-foreground">Suivant</span>
              <span className="truncate font-medium">{next.title}</span>
            </span>
            <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function DocHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const pathname = normalizePath(usePathname());
  const index = flatNav.findIndex((i) => i.href === pathname);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mb-8"
    >
      <Breadcrumbs />
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        {index >= 0 ? (
          <Badge variant="secondary" className="mt-1">
            Chapitre {index + 1} / {flatNav.length}
          </Badge>
        ) : null}
      </div>
      <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      <div
        aria-hidden
        className="mt-5 h-0.5 w-24 animate-shine rounded-full bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-2)),hsl(var(--color-3)),hsl(var(--color-1)))] bg-[length:200%_auto]"
      />
    </motion.div>
  );
}
