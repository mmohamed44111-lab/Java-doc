"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon, ChevronRightIcon as Sep } from "lucide-react";

import { getPrevNext, docsNav } from "@/lib/docs-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Breadcrumbs() {
  const pathname = usePathname();
  const section = docsNav.find((s) =>
    s.items.some((i) => i.href === pathname)
  );
  const item = section?.items.find((i) => i.href === pathname);

  return (
    <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/docs" className="transition-colors hover:text-foreground">
        Docs
      </Link>
      {section ? (
        <>
          <Sep className="size-3.5" />
          <span>{section.title}</span>
        </>
      ) : null}
      {item ? (
        <>
          <Sep className="size-3.5" />
          <span className="font-medium text-foreground">{item.title}</span>
        </>
      ) : null}
    </div>
  );
}

export function PrevNext() {
  const pathname = usePathname();
  const { prev, next } = getPrevNext(pathname);

  return (
    <div className="mt-12">
      <Separator className="mb-6" />
      <div className="flex items-center justify-between gap-4">
        {prev ? (
          <Button variant="outline" asChild className="h-auto py-3">
            <Link href={prev.href}>
              <ChevronLeftIcon className="size-4" />
              <span className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Précédent</span>
                <span>{prev.title}</span>
              </span>
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button variant="outline" asChild className="h-auto py-3">
            <Link href={next.href}>
              <span className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Suivant</span>
                <span>{next.title}</span>
              </span>
              <ChevronRightIcon className="size-4" />
            </Link>
          </Button>
        ) : (
          <span />
        )}
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
  return (
    <div className="mb-8">
      <Breadcrumbs />
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">{description}</p>
    </div>
  );
}
