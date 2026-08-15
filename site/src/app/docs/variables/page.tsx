import type { Metadata } from "next";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import { Badge } from "@/components/modern-ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/doc-table";

export const metadata: Metadata = { title: "Variables & types" };

const primitives = [
  { type: "byte", taille: "8 bits", plage: "-128 à 127", defaut: "0" },
  { type: "short", taille: "16 bits", plage: "-32 768 à 32 767", defaut: "0" },
  { type: "int", taille: "32 bits", plage: "≈ ±2,1 milliards", defaut: "0" },
  { type: "long", taille: "64 bits", plage: "≈ ±9,2 × 10¹⁸", defaut: "0L" },
  { type: "float", taille: "32 bits", plage: "±3,4 × 10³⁸", defaut: "0.0f" },
  { type: "double", taille: "64 bits", plage: "±1,7 × 10³⁰⁸", defaut: "0.0d" },
  {
    type: "char",
    taille: "16 bits",
    plage: "caractère Unicode",
    defaut: "'\\u0000'",
  },
  { type: "boolean", taille: "1 bit*", plage: "true / false", defaut: "false" },
];

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Variables & types"
        description="Java est un langage à typage statique fort : chaque variable a un type connu à la compilation."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Déclaration de variables
      </h2>
      <CodeBlock
        title="Variables.java"
        code={`int age = 25;                    // entier
double prix = 19.99;             // nombre décimal
char initiale = 'A';             // caractère unique
boolean actif = true;            // booléen
String nom = "Fatima";           // chaîne de caractères (objet)

// Depuis Java 10 : inférence de type avec var
var compteur = 0;                // int déduit automatiquement
var message = "Salut";           // String déduit`}
      />

      <Alert variant="info" className="mt-2">
        <InfoIcon />
        <AlertTitle>String n&apos;est pas un type primitif</AlertTitle>
        <AlertDescription>
          <code>String</code> est une classe (un objet). C&apos;est pour cela
          qu&apos;elle commence par une majuscule, contrairement aux 8 types
          primitifs.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Les 8 types primitifs
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Taille</TableHead>
            <TableHead>Plage</TableHead>
            <TableHead>Défaut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {primitives.map((p) => (
            <TableRow key={p.type}>
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  {p.type}
                </Badge>
              </TableCell>
              <TableCell>{p.taille}</TableCell>
              <TableCell className="whitespace-normal">{p.plage}</TableCell>
              <TableCell className="font-mono text-muted-foreground">
                {p.defaut}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-2 text-sm text-muted-foreground">
        * la taille réelle d&apos;un <code>boolean</code> dépend de la JVM.
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Conversions de types (casting)
      </h2>
      <CodeBlock
        title="Casting.java"
        code={`// Conversion implicite (élargissement) : sans perte
int petit = 100;
long grand = petit;          // int → long : OK automatiquement
double d = grand;            // long → double : OK

// Conversion explicite (rétrécissement) : risque de perte
double pi = 3.14159;
int tronque = (int) pi;      // → 3 (partie décimale perdue !)

// Entre nombres et chaînes
String s = String.valueOf(42);       // int → String
int n = Integer.parseInt("123");     // String → int`}
      />

      <Alert className="mt-2" variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Attention aux débordements</AlertTitle>
        <AlertDescription>
          Convertir un <code>long</code> trop grand vers un <code>int</code>{" "}
          provoque un débordement silencieux : le résultat sera incorrect sans
          aucune erreur à l&apos;exécution.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Constantes avec final
      </h2>
      <CodeBlock
        title="Constantes.java"
        code={`final double TVA = 0.20;         // ne peut plus être modifiée
final int MAX_TENTATIVES = 3;

// TVA = 0.19;  // ❌ Erreur de compilation !`}
      />
      <p className="leading-7 text-muted-foreground">
        Par convention, les constantes s&apos;écrivent en{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          MAJUSCULES_AVEC_UNDERSCORES
        </code>
        .
      </p>
    </article>
  );
}
