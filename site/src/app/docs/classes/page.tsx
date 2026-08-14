import type { Metadata } from "next";
import { InfoIcon, LightbulbIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = { title: "Classes & objets" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Classes & objets"
        description="La classe est le plan de construction ; l'objet est la maison. Bienvenue dans la programmation orientée objet."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Définir une classe
      </h2>
      <CodeBlock
        title="Personne.java"
        code={`public class Personne {
    // Attributs (état de l'objet)
    private String nom;
    private int age;

    // Constructeur
    public Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    // Méthode (comportement)
    public void sePresenter() {
        System.out.println("Je suis " + nom + ", " + age + " ans.");
    }

    // Getters / Setters (encapsulation)
    public String getNom() { return nom; }
    public int getAge() { return age; }
    public void setAge(int age) {
        if (age >= 0) {         // validation !
            this.age = age;
        }
    }
}`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Créer et utiliser des objets
      </h2>
      <CodeBlock
        title="Main.java"
        code={`public class Main {
    public static void main(String[] args) {
        // new appelle le constructeur
        Personne alice = new Personne("Alice", 30);
        Personne bruno = new Personne("Bruno", 25);

        alice.sePresenter();   // Je suis Alice, 30 ans.
        bruno.sePresenter();   // Je suis Bruno, 25 ans.

        alice.setAge(31);
        System.out.println(alice.getAge());  // 31
    }
}`}
      />

      <Alert className="mt-2">
        <InfoIcon />
        <AlertTitle>Encapsulation</AlertTitle>
        <AlertDescription>
          Les attributs sont <code>private</code> et accessibles uniquement via
          des méthodes publiques (getters/setters). Cela protège l&apos;état
          interne de l&apos;objet et permet d&apos;ajouter de la validation.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Modificateurs d&apos;accès
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Modificateur</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Sous-classe</TableHead>
            <TableHead>Partout</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ["public", true, true, true, true],
            ["protected", true, true, true, false],
            ["(défaut)", true, true, false, false],
            ["private", true, false, false, false],
          ].map(([name, ...cols]) => (
            <TableRow key={name as string}>
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  {name as string}
                </Badge>
              </TableCell>
              {(cols as boolean[]).map((ok, i) => (
                <TableCell key={i}>
                  {ok ? (
                    <span className="text-emerald-500">✓</span>
                  ) : (
                    <span className="text-muted-foreground">✗</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        static : membres de classe
      </h2>
      <CodeBlock
        title="Compteur.java"
        code={`public class Compteur {
    private static int total = 0;   // partagé par TOUS les objets
    private int valeur = 0;         // propre à CHAQUE objet

    public Compteur() {
        total++;
    }

    public static int getTotal() {  // méthode de classe
        return total;
    }
}

// Utilisation :
new Compteur();
new Compteur();
System.out.println(Compteur.getTotal());  // 2 — appel via la classe`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Records : classes de données concises
      </h2>
      <CodeBlock
        title="Point.java"
        code={`// Depuis Java 16 : un record génère constructeur,
// getters, equals, hashCode et toString automatiquement
public record Point(int x, int y) { }

// Utilisation :
Point p = new Point(3, 4);
System.out.println(p.x());       // 3
System.out.println(p);           // Point[x=3, y=4]`}
      />

      <Alert className="mt-6">
        <LightbulbIcon className="text-amber-500" />
        <AlertTitle>Bonne pratique</AlertTitle>
        <AlertDescription>
          Utilisez un <code>record</code> pour les objets immuables porteurs de
          données (coordonnées, DTO, résultats), et une classe classique quand
          l&apos;objet a un comportement ou un état modifiable.
        </AlertDescription>
      </Alert>
    </article>
  );
}
