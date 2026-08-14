import type { Metadata } from "next";
import { LightbulbIcon } from "lucide-react";

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

export const metadata: Metadata = { title: "Interfaces & abstraction" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Interfaces & abstraction"
        description="Définissez des contrats que les classes s'engagent à respecter, sans imposer d'implémentation."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Interface : un contrat
      </h2>
      <CodeBlock
        title="Payable.java"
        code={`public interface Payable {
    double montant();                       // abstraite par défaut

    default String devise() {               // méthode par défaut (Java 8+)
        return "MAD";
    }
}`}
      />
      <CodeBlock
        title="Facture.java"
        code={`public class Facture implements Payable {
    private final double total;

    public Facture(double total) {
        this.total = total;
    }

    @Override
    public double montant() {
        return total;
    }
}

// Une classe peut implémenter PLUSIEURS interfaces :
public class Salaire implements Payable, Comparable<Salaire> {
    // ...
}`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Classe abstraite : un modèle partiel
      </h2>
      <CodeBlock
        title="Forme.java"
        code={`public abstract class Forme {
    protected String couleur;

    public Forme(String couleur) {
        this.couleur = couleur;
    }

    public abstract double aire();          // à implémenter par les enfants

    public void afficher() {                // comportement partagé
        System.out.println("Forme " + couleur + ", aire = " + aire());
    }
}

public class Cercle extends Forme {
    private final double rayon;

    public Cercle(String couleur, double rayon) {
        super(couleur);
        this.rayon = rayon;
    }

    @Override
    public double aire() {
        return Math.PI * rayon * rayon;
    }
}

// new Forme("rouge");        // ❌ impossible d'instancier une classe abstraite
Forme f = new Cercle("bleu", 2.0);   // ✅
f.afficher();                        // Forme bleu, aire = 12.56...`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Interface ou classe abstraite ?
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Critère</TableHead>
            <TableHead>Interface</TableHead>
            <TableHead>Classe abstraite</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Héritage multiple</TableCell>
            <TableCell className="whitespace-normal">✓ plusieurs interfaces</TableCell>
            <TableCell className="whitespace-normal">✗ une seule classe</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Attributs d&apos;instance</TableCell>
            <TableCell className="whitespace-normal">✗ (constantes seulement)</TableCell>
            <TableCell className="whitespace-normal">✓</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Constructeur</TableCell>
            <TableCell>✗</TableCell>
            <TableCell>✓</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Cas d&apos;usage</TableCell>
            <TableCell className="whitespace-normal">
              Capacité transverse (« sait faire »)
            </TableCell>
            <TableCell className="whitespace-normal">
              Base commune avec état partagé (« est un »)
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Interfaces fonctionnelles & lambdas
      </h2>
      <CodeBlock
        title="Lambda.java"
        code={`// Une interface fonctionnelle n'a qu'UNE méthode abstraite
@FunctionalInterface
interface Calcul {
    int appliquer(int a, int b);
}

// On peut l'implémenter avec une lambda :
Calcul addition = (a, b) -> a + b;
Calcul maximum  = (a, b) -> Math.max(a, b);

System.out.println(addition.appliquer(3, 4));  // 7
System.out.println(maximum.appliquer(3, 4));   // 4`}
      />

      <Alert className="mt-6">
        <LightbulbIcon className="text-amber-500" />
        <AlertTitle>Bonne pratique</AlertTitle>
        <AlertDescription>
          « Programmez vers une interface, pas vers une implémentation » :
          déclarez <code>List&lt;String&gt; liste = new ArrayList&lt;&gt;()</code>{" "}
          plutôt que <code>ArrayList&lt;String&gt; liste = ...</code>. Vous
          pourrez changer d&apos;implémentation sans toucher au reste du code.
        </AlertDescription>
      </Alert>
    </article>
  );
}
