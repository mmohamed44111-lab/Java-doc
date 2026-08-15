import type { Metadata } from "next";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";

export const metadata: Metadata = { title: "Héritage & polymorphisme" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Héritage & polymorphisme"
        description="Réutilisez et spécialisez le code : une sous-classe hérite des attributs et méthodes de sa super-classe."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Hériter avec extends
      </h2>
      <CodeBlock
        title="Animal.java"
        code={`public class Animal {
    protected String nom;

    public Animal(String nom) {
        this.nom = nom;
    }

    public void crier() {
        System.out.println(nom + " fait un bruit.");
    }
}`}
      />
      <CodeBlock
        title="Chien.java"
        code={`public class Chien extends Animal {

    public Chien(String nom) {
        super(nom);              // appelle le constructeur d'Animal
    }

    @Override                    // redéfinition de la méthode héritée
    public void crier() {
        System.out.println(nom + " aboie : Ouaf !");
    }

    public void rapporter() {    // méthode propre à Chien
        System.out.println(nom + " rapporte la balle.");
    }
}`}
      />

      <Alert variant="info" className="mt-2">
        <InfoIcon />
        <AlertTitle>@Override</AlertTitle>
        <AlertDescription>
          Cette annotation demande au compilateur de vérifier qu&apos;on
          redéfinit bien une méthode existante. Sans elle, une faute de frappe
          créerait silencieusement une nouvelle méthode.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Le polymorphisme en action
      </h2>
      <CodeBlock
        title="Main.java"
        code={`public class Main {
    public static void main(String[] args) {
        // Une variable de type Animal peut référencer un Chien ou un Chat
        Animal[] animaux = {
            new Chien("Rex"),
            new Chat("Minou"),
            new Animal("Créature")
        };

        for (Animal a : animaux) {
            a.crier();   // la BONNE méthode est choisie à l'exécution
        }
        // Rex aboie : Ouaf !
        // Minou miaule : Miaou !
        // Créature fait un bruit.
    }
}`}
      />
      <p className="leading-7 text-muted-foreground">
        C&apos;est la{" "}
        <strong className="text-foreground">liaison dynamique</strong> : la JVM
        choisit la méthode selon le type <em>réel</em> de l&apos;objet, pas
        selon le type de la variable.
      </p>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        instanceof et transtypage
      </h2>
      <CodeBlock
        title="Instanceof.java"
        code={`Animal a = new Chien("Rex");

// Pattern matching (Java 16+) : test + cast en une étape
if (a instanceof Chien chien) {
    chien.rapporter();    // OK, on peut utiliser les méthodes de Chien
}`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        final : interdire l&apos;héritage
      </h2>
      <CodeBlock
        title="Final.java"
        code={`public final class Immuable { }        // aucune sous-classe possible

public class Base {
    public final void critique() { }   // méthode non redéfinissable
}`}
      />

      <Alert className="mt-6" variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Pas d&apos;héritage multiple</AlertTitle>
        <AlertDescription>
          Une classe Java ne peut hériter que d&apos;<strong>une seule</strong>{" "}
          classe. Pour combiner plusieurs « contrats », utilisez les interfaces
          — c&apos;est le sujet du chapitre suivant.
        </AlertDescription>
      </Alert>
    </article>
  );
}
