import type { Metadata } from "next";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/modern-ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/doc-table";

export const metadata: Metadata = { title: "Exceptions" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Exceptions"
        description="Gérez les erreurs proprement : détectez, traitez et signalez les situations anormales sans faire planter le programme."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        try / catch / finally
      </h2>
      <CodeBlock
        title="Division.java"
        code={`public class Division {
    public static void main(String[] args) {
        try {
            int resultat = 10 / 0;         // ⚠️ ArithmeticException !
            System.out.println(resultat);  // jamais exécuté
        } catch (ArithmeticException e) {
            System.out.println("Division par zéro : " + e.getMessage());
        } finally {
            System.out.println("Toujours exécuté, erreur ou pas.");
        }
        System.out.println("Le programme continue !");
    }
}`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Checked vs unchecked
      </h2>
      <Table className="mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Vérifiée par le compilateur ?</TableHead>
            <TableHead>Exemples</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Checked</TableCell>
            <TableCell className="whitespace-normal">
              Oui — il faut catch ou throws
            </TableCell>
            <TableCell className="whitespace-normal font-mono text-sm">
              IOException, SQLException
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Unchecked</TableCell>
            <TableCell className="whitespace-normal">
              Non — héritent de RuntimeException
            </TableCell>
            <TableCell className="whitespace-normal font-mono text-sm">
              NullPointerException, ArithmeticException,
              IndexOutOfBoundsException
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Error</TableCell>
            <TableCell className="whitespace-normal">
              Non — erreurs graves de la JVM, à ne pas attraper
            </TableCell>
            <TableCell className="whitespace-normal font-mono text-sm">
              OutOfMemoryError, StackOverflowError
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Lancer une exception : throw & throws
      </h2>
      <CodeBlock
        title="CompteBancaire.java"
        code={`public class CompteBancaire {
    private double solde;

    public void retirer(double montant) {
        if (montant <= 0) {
            throw new IllegalArgumentException("Montant invalide : " + montant);
        }
        if (montant > solde) {
            throw new IllegalStateException("Solde insuffisant");
        }
        solde -= montant;
    }
}`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        Exceptions personnalisées
      </h2>
      <CodeBlock
        title="SoldeInsuffisantException.java"
        code={`// Exception métier, avec des informations utiles
public class SoldeInsuffisantException extends Exception {
    private final double manque;

    public SoldeInsuffisantException(double manque) {
        super("Il manque " + manque + " MAD pour cette opération.");
        this.manque = manque;
    }

    public double getManque() {
        return manque;
    }
}

// Utilisation :
// throw new SoldeInsuffisantException(150.0);`}
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        try-with-resources
      </h2>
      <CodeBlock
        title="LectureFichier.java"
        code={`import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

// La ressource est fermée AUTOMATIQUEMENT, même en cas d'erreur
try (BufferedReader lecteur = new BufferedReader(new FileReader("data.txt"))) {
    String ligne;
    while ((ligne = lecteur.readLine()) != null) {
        System.out.println(ligne);
    }
} catch (IOException e) {
    System.err.println("Erreur de lecture : " + e.getMessage());
}`}
      />

      <Alert variant="info" className="mt-6">
        <InfoIcon />
        <AlertTitle>Bonnes pratiques</AlertTitle>
        <AlertDescription>
          <p>
            Attrapez les exceptions les plus spécifiques d&apos;abord ·
            n&apos;avalez jamais une exception avec un catch vide · utilisez
            try-with-resources pour les fichiers, connexions et flux.
          </p>
        </AlertDescription>
      </Alert>

      <Alert className="mt-4" variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>À éviter absolument</AlertTitle>
        <AlertDescription>
          <code>catch (Exception e) {"{}"}</code> — un bloc catch vide masque
          les erreurs et rend le débogage impossible. Au minimum, journalisez
          l&apos;exception.
        </AlertDescription>
      </Alert>
    </article>
  );
}
