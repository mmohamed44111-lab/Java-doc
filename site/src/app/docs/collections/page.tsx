import type { Metadata } from "next";
import { LightbulbIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import { Badge } from "@/components/modern-ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/doc-table";

export const metadata: Metadata = { title: "Collections" };

const impls = [
  [
    "List",
    "ArrayList",
    "Liste ordonnée, doublons autorisés, accès rapide par index",
  ],
  ["List", "LinkedList", "Insertion/suppression rapides en tête et en queue"],
  ["Set", "HashSet", "Éléments uniques, sans ordre garanti, très rapide"],
  ["Set", "TreeSet", "Éléments uniques, triés automatiquement"],
  ["Map", "HashMap", "Paires clé → valeur, accès quasi instantané"],
  ["Map", "TreeMap", "Paires clé → valeur, clés triées"],
  ["Queue", "ArrayDeque", "File (FIFO) ou pile (LIFO) efficace"],
];

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Collections"
        description="Le framework Collections fournit des structures de données puissantes : listes, ensembles, dictionnaires et files."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Panorama des implémentations
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Interface</TableHead>
            <TableHead>Implémentation</TableHead>
            <TableHead>Caractéristiques</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {impls.map(([iface, impl, desc]) => (
            <TableRow key={impl}>
              <TableCell>
                <Badge variant="secondary" className="font-mono">
                  {iface}
                </Badge>
              </TableCell>
              <TableCell className="font-mono font-medium">{impl}</TableCell>
              <TableCell className="whitespace-normal text-muted-foreground">
                {desc}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        En pratique
      </h2>
      <Tabs defaultValue="list" className="mt-4">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="set">Set</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <CodeBlock
            title="ExempleList.java"
            code={`import java.util.ArrayList;
import java.util.List;

List<String> courses = new ArrayList<>();
courses.add("pain");
courses.add("lait");
courses.add("pain");            // doublon autorisé

System.out.println(courses.get(0));       // pain
System.out.println(courses.size());       // 3
courses.remove("lait");
System.out.println(courses.contains("lait")); // false

// Liste immuable (Java 9+)
List<Integer> nombres = List.of(1, 2, 3);`}
          />
        </TabsContent>
        <TabsContent value="set">
          <CodeBlock
            title="ExempleSet.java"
            code={`import java.util.HashSet;
import java.util.Set;

Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("web");
tags.add("java");               // ignoré : déjà présent !

System.out.println(tags.size());          // 2
System.out.println(tags.contains("web")); // true`}
          />
        </TabsContent>
        <TabsContent value="map">
          <CodeBlock
            title="ExempleMap.java"
            code={`import java.util.HashMap;
import java.util.Map;

Map<String, Integer> stock = new HashMap<>();
stock.put("pommes", 12);
stock.put("poires", 5);
stock.put("pommes", 20);        // remplace l'ancienne valeur

System.out.println(stock.get("pommes"));        // 20
System.out.println(stock.getOrDefault("kiwis", 0)); // 0

// Parcourir une Map
for (Map.Entry<String, Integer> e : stock.entrySet()) {
    System.out.println(e.getKey() + " → " + e.getValue());
}`}
          />
        </TabsContent>
      </Tabs>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Streams : traiter les collections avec élégance
      </h2>
      <CodeBlock
        title="ExempleStream.java"
        code={`import java.util.List;

List<String> noms = List.of("Amine", "Sara", "Bilal", "Salma", "Adam");

// Filtrer, transformer, collecter — en une chaîne lisible
List<String> resultat = noms.stream()
    .filter(n -> n.startsWith("S"))     // Sara, Salma
    .map(String::toUpperCase)           // SARA, SALMA
    .sorted()
    .toList();

System.out.println(resultat);  // [SALMA, SARA]

// Statistiques en une ligne
long total = noms.stream().filter(n -> n.length() > 4).count(); // 3`}
      />

      <Alert variant="warning" className="mt-6">
        <LightbulbIcon />
        <AlertTitle>Quelle collection choisir ?</AlertTitle>
        <AlertDescription>
          <p>
            Besoin d&apos;un ordre et de doublons → <code>ArrayList</code>.
            Unicité des éléments → <code>HashSet</code>. Association clé/valeur
            → <code>HashMap</code>. Tri automatique → versions{" "}
            <code>Tree*</code>.
          </p>
        </AlertDescription>
      </Alert>
    </article>
  );
}
