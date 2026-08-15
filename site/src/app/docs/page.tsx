import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, InfoIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/modern-ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/doc-table";

export const metadata: Metadata = { title: "Introduction" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Introduction à Java"
        description="Découvrez ce qu'est Java, pourquoi il est si utilisé et comment ce manuel est organisé."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Qu&apos;est-ce que Java ?
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        <strong className="text-foreground">Java</strong> est un langage de
        programmation orienté objet, créé en 1995 par James Gosling chez Sun
        Microsystems (aujourd&apos;hui Oracle). Sa devise :{" "}
        <em>« Write once, run anywhere »</em> — écrivez votre code une fois,
        exécutez-le partout. Le code Java est compilé en{" "}
        <strong className="text-foreground">bytecode</strong>, exécuté par la{" "}
        <strong className="text-foreground">JVM</strong> (Java Virtual Machine),
        disponible sur presque toutes les plateformes.
      </p>

      <Alert variant="info" className="mt-6">
        <InfoIcon />
        <AlertTitle>Le saviez-vous ?</AlertTitle>
        <AlertDescription>
          Java propulse des milliards d&apos;appareils : applications
          d&apos;entreprise, applications Android, serveurs web, systèmes
          embarqués, et même certains jeux comme Minecraft.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Les concepts clés
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Terme</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-mono font-medium">JDK</TableCell>
            <TableCell className="whitespace-normal">
              Java Development Kit — outils pour développer (compilateur javac,
              etc.)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono font-medium">JRE</TableCell>
            <TableCell className="whitespace-normal">
              Java Runtime Environment — environnement pour exécuter des
              programmes Java
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono font-medium">JVM</TableCell>
            <TableCell className="whitespace-normal">
              Java Virtual Machine — machine virtuelle qui exécute le bytecode
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono font-medium">Bytecode</TableCell>
            <TableCell className="whitespace-normal">
              Code intermédiaire produit par la compilation (fichiers .class)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Votre premier aperçu
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Voici le programme le plus célèbre du monde, version Java :
      </p>
      <CodeBlock
        title="HelloWorld.java"
        code={`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
      />
      <p className="leading-7 text-muted-foreground">
        Chaque programme Java démarre par la méthode{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          main
        </code>
        . Nous détaillerons chaque mot-clé dans les prochains chapitres.
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Comment lire ce manuel
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link href="/docs/installation" className="group block h-full">
          <Card
            variant="interactive"
            size="sm"
            className="h-full p-5 hover:border-primary/40"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5 text-base">
                1. Démarrage
                <ArrowRightIcon className="size-3.5" />
              </CardTitle>
              <CardDescription>
                Installez le JDK et exécutez votre premier programme.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/docs/variables" className="group block h-full">
          <Card
            variant="interactive"
            size="sm"
            className="h-full p-5 hover:border-primary/40"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5 text-base">
                2. Les bases
                <ArrowRightIcon className="size-3.5" />
              </CardTitle>
              <CardDescription>
                Variables, opérateurs et structures de contrôle.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/docs/classes" className="group block h-full">
          <Card
            variant="interactive"
            size="sm"
            className="h-full p-5 hover:border-primary/40"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5 text-base">
                3. POO
                <ArrowRightIcon className="size-3.5" />
              </CardTitle>
              <CardDescription>
                Classes, héritage, polymorphisme et interfaces.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/docs/collections" className="group block h-full">
          <Card
            variant="interactive"
            size="sm"
            className="h-full p-5 hover:border-primary/40"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5 text-base">
                4. Aller plus loin
                <ArrowRightIcon className="size-3.5" />
              </CardTitle>
              <CardDescription>
                Collections et gestion des exceptions.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </article>
  );
}
