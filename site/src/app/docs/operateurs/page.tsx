import type { Metadata } from "next";
import { TriangleAlertIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Opérateurs" };

const rows = [
  ["Arithmétiques", "+  -  *  /  %", "Calculs numériques"],
  ["Affectation", "=  +=  -=  *=  /=  %=", "Assigner / modifier une valeur"],
  ["Incrémentation", "++  --", "Ajouter / retirer 1"],
  ["Comparaison", "==  !=  <  >  <=  >=", "Comparer deux valeurs"],
  ["Logiques", "&&  ||  !", "Combiner des booléens"],
  ["Ternaire", "condition ? a : b", "Expression conditionnelle compacte"],
];

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Opérateurs"
        description="Les opérateurs permettent de manipuler valeurs et variables : calculs, comparaisons et logique."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Vue d&apos;ensemble
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Catégorie</TableHead>
            <TableHead>Opérateurs</TableHead>
            <TableHead>Usage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(([cat, ops, usage]) => (
            <TableRow key={cat}>
              <TableCell className="font-medium">{cat}</TableCell>
              <TableCell className="font-mono">{ops}</TableCell>
              <TableCell className="whitespace-normal text-muted-foreground">
                {usage}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Arithmétique
      </h2>
      <CodeBlock
        title="Arithmetique.java"
        code={`int a = 17, b = 5;

System.out.println(a + b);   // 22
System.out.println(a - b);   // 12
System.out.println(a * b);   // 85
System.out.println(a / b);   // 3   ← division ENTIÈRE !
System.out.println(a % b);   // 2   ← reste (modulo)

// Pour une division décimale, un des opérandes doit être double
System.out.println(a / 5.0); // 3.4`}
      />

      <Alert className="mt-2" variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Piège classique</AlertTitle>
        <AlertDescription>
          <code>17 / 5</code> vaut <code>3</code> et non <code>3.4</code> : la
          division entre deux entiers est toujours entière en Java.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Incrémentation : préfixe vs postfixe
      </h2>
      <CodeBlock
        title="Increment.java"
        code={`int i = 5;
System.out.println(i++);  // affiche 5, PUIS i devient 6
System.out.println(i);    // 6

int j = 5;
System.out.println(++j);  // j devient 6, PUIS affiche 6`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Logique et comparaison
      </h2>
      <CodeBlock
        title="Logique.java"
        code={`int age = 20;
boolean majeur = age >= 18;               // true
boolean etudiant = true;

// && : ET logique (court-circuit)
boolean tarifReduit = etudiant && age < 26;   // true

// || : OU logique
boolean gratuit = age < 4 || age > 65;        // false

// ! : négation
System.out.println(!majeur);                  // false

// Opérateur ternaire
String statut = majeur ? "adulte" : "mineur"; // "adulte"`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Comparer des chaînes : equals, pas ==
      </h2>
      <CodeBlock
        title="Egalite.java"
        code={`String s1 = new String("java");
String s2 = new String("java");

System.out.println(s1 == s2);        // false ← compare les RÉFÉRENCES
System.out.println(s1.equals(s2));   // true  ← compare le CONTENU`}
      />
      <Alert className="mt-2" variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Règle d&apos;or</AlertTitle>
        <AlertDescription>
          Utilisez toujours <code>.equals()</code> pour comparer des objets
          (dont les <code>String</code>). Réservez <code>==</code> aux types
          primitifs.
        </AlertDescription>
      </Alert>
    </article>
  );
}
