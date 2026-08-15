import type { Metadata } from "next";
import { LightbulbIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/modern-ui/tabs";

export const metadata: Metadata = { title: "Structures de contrôle" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Structures de contrôle"
        description="Conditions et boucles : donnez de la logique à vos programmes."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Conditions
      </h2>

      <Tabs defaultValue="if" className="mt-4">
        <TabsList>
          <TabsTrigger value="if">if / else</TabsTrigger>
          <TabsTrigger value="switch">switch classique</TabsTrigger>
          <TabsTrigger value="switch-expr">switch moderne</TabsTrigger>
        </TabsList>
        <TabsContent value="if">
          <CodeBlock
            title="Conditions.java"
            code={`int note = 15;

if (note >= 16) {
    System.out.println("Très bien");
} else if (note >= 12) {
    System.out.println("Assez bien");
} else if (note >= 10) {
    System.out.println("Passable");
} else {
    System.out.println("Insuffisant");
}
// → Assez bien`}
          />
        </TabsContent>
        <TabsContent value="switch">
          <CodeBlock
            title="SwitchClassique.java"
            code={`int jour = 3;
switch (jour) {
    case 1:
        System.out.println("Lundi");
        break;               // sans break, on "tombe" dans le cas suivant !
    case 2:
        System.out.println("Mardi");
        break;
    case 3:
        System.out.println("Mercredi");
        break;
    default:
        System.out.println("Autre jour");
}`}
          />
        </TabsContent>
        <TabsContent value="switch-expr">
          <CodeBlock
            title="SwitchModerne.java"
            code={`// Depuis Java 14 : expression switch, concise et sans break
int jour = 3;
String nom = switch (jour) {
    case 1 -> "Lundi";
    case 2 -> "Mardi";
    case 3 -> "Mercredi";
    case 6, 7 -> "Week-end";
    default -> "Autre jour";
};
System.out.println(nom); // Mercredi`}
          />
        </TabsContent>
      </Tabs>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Boucles
      </h2>

      <Tabs defaultValue="for" className="mt-4">
        <TabsList>
          <TabsTrigger value="for">for</TabsTrigger>
          <TabsTrigger value="foreach">for-each</TabsTrigger>
          <TabsTrigger value="while">while</TabsTrigger>
          <TabsTrigger value="dowhile">do-while</TabsTrigger>
        </TabsList>
        <TabsContent value="for">
          <CodeBlock
            title="BoucleFor.java"
            code={`// for (initialisation ; condition ; incrément)
for (int i = 1; i <= 5; i++) {
    System.out.println("Tour n°" + i);
}
// Tour n°1 ... Tour n°5`}
          />
        </TabsContent>
        <TabsContent value="foreach">
          <CodeBlock
            title="ForEach.java"
            code={`String[] fruits = {"pomme", "banane", "orange"};

// Idéal pour parcourir tableaux et collections
for (String fruit : fruits) {
    System.out.println(fruit);
}`}
          />
        </TabsContent>
        <TabsContent value="while">
          <CodeBlock
            title="BoucleWhile.java"
            code={`int compteur = 0;

// La condition est testée AVANT chaque tour
while (compteur < 3) {
    System.out.println("compteur = " + compteur);
    compteur++;
}`}
          />
        </TabsContent>
        <TabsContent value="dowhile">
          <CodeBlock
            title="DoWhile.java"
            code={`int n = 10;

// Le corps est exécuté AU MOINS une fois
do {
    System.out.println("n = " + n);
    n++;
} while (n < 5);
// → n = 10 (une seule exécution)`}
          />
        </TabsContent>
      </Tabs>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        break et continue
      </h2>
      <CodeBlock
        title="BreakContinue.java"
        code={`for (int i = 1; i <= 10; i++) {
    if (i == 7) {
        break;      // sort complètement de la boucle
    }
    if (i % 2 == 0) {
        continue;   // passe directement au tour suivant
    }
    System.out.println(i);
}
// → 1, 3, 5`}
      />

      <Alert variant="warning" className="mt-6">
        <LightbulbIcon />
        <AlertTitle>Quelle boucle choisir ?</AlertTitle>
        <AlertDescription>
          <p>
            <strong>for</strong> : nombre de tours connu à l&apos;avance ·{" "}
            <strong>for-each</strong> : parcours d&apos;une collection ·{" "}
            <strong>while</strong> : tant qu&apos;une condition est vraie ·{" "}
            <strong>do-while</strong> : au moins une exécution garantie.
          </p>
        </AlertDescription>
      </Alert>
    </article>
  );
}
