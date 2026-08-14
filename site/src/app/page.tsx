import Link from "next/link";
import {
  ArrowRightIcon,
  BoxesIcon,
  BracesIcon,
  CircleAlertIcon,
  CoffeeIcon,
  LayersIcon,
  RocketIcon,
  SparklesIcon,
  TerminalIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { CodeBlock } from "@/components/code-block";

const features = [
  {
    icon: RocketIcon,
    title: "Démarrage rapide",
    description:
      "Installez le JDK, écrivez et exécutez votre premier programme Java en quelques minutes.",
    href: "/docs/installation",
  },
  {
    icon: BracesIcon,
    title: "Les bases du langage",
    description:
      "Variables, types primitifs, opérateurs et structures de contrôle expliqués pas à pas.",
    href: "/docs/variables",
  },
  {
    icon: BoxesIcon,
    title: "Orienté objet",
    description:
      "Classes, objets, héritage, polymorphisme, interfaces et abstraction — le cœur de Java.",
    href: "/docs/classes",
  },
  {
    icon: LayersIcon,
    title: "Collections",
    description:
      "List, Set, Map… maîtrisez les structures de données du framework Collections.",
    href: "/docs/collections",
  },
  {
    icon: CircleAlertIcon,
    title: "Exceptions",
    description:
      "Gérez les erreurs proprement avec try/catch/finally et les exceptions personnalisées.",
    href: "/docs/exceptions",
  },
  {
    icon: TerminalIcon,
    title: "Exemples exécutables",
    description:
      "Chaque chapitre contient des extraits de code prêts à copier et à exécuter.",
    href: "/docs",
  },
];

const heroCode = `public class Bonjour {
    public static void main(String[] args) {
        String nom = "le monde";
        System.out.println("Bonjour, " + nom + " !");
    }
}`;

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(45rem_25rem_at_50%_-10%,oklch(0.55_0.18_27_/_0.15),transparent)]"
          />
          <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <div className="flex flex-col items-start gap-6">
              <Badge variant="secondary" className="gap-1.5">
                <SparklesIcon className="size-3" />
                Manuel complet, en français
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Apprenez <span className="text-primary">Java</span>, du premier
                <code className="mx-2 rounded-md bg-muted px-2 font-mono text-[0.85em]">
                  main()
                </code>
                aux collections.
              </h1>
              <p className="max-w-prose text-lg text-muted-foreground">
                Le manuel Java repensé comme une documentation web moderne :
                navigation claire, exemples de code colorés et copiables,
                tableaux de référence et bonnes pratiques.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link href="/docs">
                    Commencer la lecture
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/docs/installation">
                    <TerminalIcon className="size-4" />
                    Installation
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CoffeeIcon className="size-4 text-primary" /> 10 chapitres
                </span>
                <span>40+ exemples de code</span>
                <span>100 % gratuit</span>
              </div>
            </div>

            <div className="hidden md:block">
              <CodeBlock code={heroCode} title="Bonjour.java" className="my-0 shadow-lg" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Tout le manuel, bien organisé
            </h2>
            <p className="mt-2 text-muted-foreground">
              Progressez chapitre par chapitre, du niveau débutant au niveau avancé.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Link key={f.title} href={f.href} className="group">
                <Card className="h-full gap-3 py-5 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                  <CardHeader>
                    <div className="mb-1 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <f.icon className="size-5" />
                    </div>
                    <CardTitle className="flex items-center gap-1">
                      {f.title}
                      <ArrowRightIcon className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </CardTitle>
                    <CardDescription>{f.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/40">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-4 px-4 py-16 text-center md:px-8">
            <CoffeeIcon className="size-8 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Prêt à écrire votre premier programme ?
            </h2>
            <p className="max-w-prose text-muted-foreground">
              Suivez le guide d&apos;installation, puis avancez à votre rythme.
              Chaque page se termine par un lien vers le chapitre suivant.
            </p>
            <Button size="lg" asChild>
              <Link href="/docs/installation">
                Démarrer maintenant
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
          <span className="flex items-center gap-2">
            <CoffeeIcon className="size-4" /> Manuel Java — Documentation
          </span>
          <span>Construit avec Next.js & shadcn/ui</span>
        </div>
      </footer>
    </div>
  );
}
