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

import { Button } from "@/components/modern-ui/button";
import { Badge } from "@/components/modern-ui/badge";
import { RainbowButton } from "@/components/modern-ui/rainbow-button";
import { SparklesText } from "@/components/modern-ui/sparkles-text";
import { AnimatedGradientText } from "@/components/modern-ui/animated-gradient-text";
import { NumberCounter } from "@/components/modern-ui/number-counter";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardDecoration,
} from "@/components/modern-ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/modern-ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { CodeBlock } from "@/components/code-block";
import { Reveal } from "@/components/reveal";

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

const faq = [
  {
    q: "Faut-il des connaissances préalables ?",
    a: "Non. Le manuel part de zéro : installation du JDK, premier programme, puis montée progressive vers la programmation orientée objet et les collections.",
  },
  {
    q: "Quelle version de Java est utilisée ?",
    a: "Les exemples ciblent Java 17+ (LTS), tout en signalant les nouveautés modernes comme var, les switch expressions ou les records.",
  },
  {
    q: "Puis-je copier les exemples de code ?",
    a: "Oui — chaque bloc de code possède un bouton « Copier » et une coloration syntaxique adaptée au thème clair comme au thème sombre.",
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
          {/* Layered Modern UI backdrop: aurora blobs + dot grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 text-border/60 bg-dot-pattern [mask-image:radial-gradient(50rem_30rem_at_50%_0%,black,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 size-[28rem] animate-aurora rounded-full bg-[hsl(var(--color-1))] opacity-[0.12] blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-10 size-[24rem] animate-aurora rounded-full bg-[hsl(var(--color-2))] opacity-[0.10] blur-[100px] [animation-delay:-6s]"
          />

          <div className="relative mx-auto grid w-full max-w-screen-2xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <Reveal className="flex flex-col items-start gap-6">
              <Badge variant="secondary" className="gap-1.5">
                <SparklesIcon className="mr-1 size-3" />
                Manuel complet, en français
              </Badge>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Apprenez{" "}
                <SparklesText
                  as="span"
                  className="inline text-4xl md:text-5xl lg:text-6xl"
                  colors={{ first: "#ff6b4a", second: "#ffb347" }}
                  sparklesCount={8}
                >
                  <AnimatedGradientText
                    colorFrom="#ff5c33"
                    colorTo="#ffb347"
                    speed={1.2}
                  >
                    Java
                  </AnimatedGradientText>
                </SparklesText>
                , du premier
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

              <div className="flex flex-wrap items-center gap-3">
                <RainbowButton asChild size="lg" className="group">
                  <Link href="/docs" className="flex items-center gap-2">
                    Commencer la lecture
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </RainbowButton>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/docs/installation">
                    <TerminalIcon className="size-4" />
                    Installation
                  </Link>
                </Button>
              </div>

              <dl className="mt-2 grid grid-cols-3 gap-6">
                {[
                  { value: 10, label: "chapitres", suffix: "" },
                  { value: 40, label: "exemples de code", suffix: "+" },
                  { value: 100, label: "% gratuit", suffix: "" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="text-2xl font-bold tracking-tight">
                      <NumberCounter
                        value={s.value}
                        className="text-foreground dark:text-foreground"
                      />
                      {s.suffix}
                    </dt>
                    <dd className="text-xs text-muted-foreground">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="hidden md:block">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-1 rounded-2xl bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-2)),hsl(var(--color-3)))] opacity-20 blur-lg"
                />
                <CodeBlock
                  code={heroCode}
                  title="Bonjour.java"
                  className="relative my-0 shadow-lg"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-8 md:py-20">
          <Reveal className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Tout le manuel, bien organisé
            </h2>
            <p className="mt-2 text-muted-foreground">
              Progressez chapitre par chapitre, du niveau débutant au niveau
              avancé.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <Link href={f.href} className="group block h-full">
                  <Card
                    variant="interactive"
                    size="sm"
                    className="h-full p-5 hover:border-primary/40"
                  >
                    <CardDecoration className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <CardHeader>
                      <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                        <f.icon className="size-5" />
                      </div>
                      <CardTitle className="flex items-center gap-1.5 text-base">
                        {f.title}
                        <ArrowRightIcon className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </CardTitle>
                      <CardDescription>{f.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8">
            <Reveal className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Questions fréquentes
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Accordion
                type="single"
                collapsible
                className="rounded-xl border bg-background px-5"
              >
                {faq.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger className="text-base no-underline hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-t">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 text-border/50 bg-dot-pattern [mask-image:radial-gradient(30rem_18rem_at_50%_50%,black,transparent)]"
          />
          <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-4 px-4 py-20 text-center md:px-8">
            <CoffeeIcon className="size-8 animate-float text-primary" />
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Prêt à écrire votre premier programme ?
            </h2>
            <p className="max-w-prose text-muted-foreground">
              Suivez le guide d&apos;installation, puis avancez à votre rythme.
              Chaque page se termine par un lien vers le chapitre suivant.
            </p>
            <RainbowButton asChild size="lg" className="mt-2">
              <Link
                href="/docs/installation"
                className="flex items-center gap-2"
              >
                Démarrer maintenant
                <ArrowRightIcon className="size-4" />
              </Link>
            </RainbowButton>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground md:flex-row md:px-8">
          <span className="flex items-center gap-2">
            <CoffeeIcon className="size-4" /> Manuel Java — Documentation
          </span>
          <span>
            Construit avec Next.js &{" "}
            <a
              href="https://modern-ui.org/docs/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Modern UI
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
