import type { Metadata } from "next";
import { CheckCircle2Icon, LightbulbIcon } from "lucide-react";

import { DocHeader } from "@/components/doc-page";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Installation & premier programme" };

export default function Page() {
  return (
    <article>
      <DocHeader
        title="Installation & premier programme"
        description="Installez le JDK sur votre système, puis compilez et exécutez votre premier programme Java."
      />

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        1. Installer le JDK
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Téléchargez la dernière version LTS du JDK (Java 21 recommandé) selon
        votre système d&apos;exploitation :
      </p>

      <Tabs defaultValue="windows" className="mt-4">
        <TabsList>
          <TabsTrigger value="windows">Windows</TabsTrigger>
          <TabsTrigger value="macos">macOS</TabsTrigger>
          <TabsTrigger value="linux">Linux</TabsTrigger>
        </TabsList>
        <TabsContent value="windows">
          <CodeBlock
            title="PowerShell"
            highlight={false}
            code={`# Avec winget (Windows 10/11)
winget install Microsoft.OpenJDK.21

# Vérifier l'installation
java --version`}
          />
        </TabsContent>
        <TabsContent value="macos">
          <CodeBlock
            title="Terminal"
            highlight={false}
            code={`# Avec Homebrew
brew install openjdk@21

# Vérifier l'installation
java --version`}
          />
        </TabsContent>
        <TabsContent value="linux">
          <CodeBlock
            title="Terminal"
            highlight={false}
            code={`# Debian / Ubuntu
sudo apt update && sudo apt install openjdk-21-jdk

# Fedora
sudo dnf install java-21-openjdk-devel

# Vérifier l'installation
java --version`}
          />
        </TabsContent>
      </Tabs>

      <Alert className="mt-6">
        <CheckCircle2Icon className="text-emerald-500" />
        <AlertTitle>Vérification</AlertTitle>
        <AlertDescription>
          Si <code>java --version</code> affiche un numéro de version (ex :
          openjdk 21.0.2), l&apos;installation est réussie.
        </AlertDescription>
      </Alert>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        2. Écrire le programme
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">
        Créez un fichier nommé{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
          Bonjour.java
        </code>{" "}
        — le nom du fichier doit être identique au nom de la classe publique :
      </p>
      <CodeBlock
        title="Bonjour.java"
        code={`public class Bonjour {
    public static void main(String[] args) {
        System.out.println("Bonjour depuis Java !");
    }
}`}
      />

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="a">
          <AccordionTrigger>
            Que signifie chaque mot-clé de cette ligne ?
          </AccordionTrigger>
          <AccordionContent className="space-y-2 text-muted-foreground">
            <p>
              <code className="text-foreground">public</code> — la méthode est
              accessible depuis l&apos;extérieur de la classe (la JVM doit
              pouvoir l&apos;appeler).
            </p>
            <p>
              <code className="text-foreground">static</code> — la méthode
              appartient à la classe elle-même, pas à un objet.
            </p>
            <p>
              <code className="text-foreground">void</code> — la méthode ne
              retourne aucune valeur.
            </p>
            <p>
              <code className="text-foreground">String[] args</code> — les
              arguments passés en ligne de commande.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>
            Pourquoi le fichier doit-il porter le nom de la classe ?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            En Java, chaque classe publique doit être définie dans un fichier
            qui porte exactement son nom (sensible à la casse), suivi de
            l&apos;extension <code className="text-foreground">.java</code>.
            C&apos;est une règle du compilateur qui facilite l&apos;organisation
            des projets.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
        3. Compiler et exécuter
      </h2>
      <CodeBlock
        title="Terminal"
        highlight={false}
        code={`# Compiler : produit Bonjour.class (bytecode)
javac Bonjour.java

# Exécuter avec la JVM
java Bonjour
# → Bonjour depuis Java !

# Depuis Java 11, on peut aussi exécuter directement :
java Bonjour.java`}
      />

      <Alert className="mt-6">
        <LightbulbIcon className="text-amber-500" />
        <AlertTitle>Astuce</AlertTitle>
        <AlertDescription>
          Pour les vrais projets, utilisez un IDE comme IntelliJ IDEA, Eclipse
          ou VS Code (extension « Extension Pack for Java ») : compilation
          automatique, autocomplétion et débogueur intégrés.
        </AlertDescription>
      </Alert>
    </article>
  );
}
