"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, FileCode2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

/* Minimal Java / generic syntax highlighter (no external deps) */
const JAVA_KEYWORDS = new Set([
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char",
  "class", "const", "continue", "default", "do", "double", "else", "enum",
  "extends", "final", "finally", "float", "for", "goto", "if", "implements",
  "import", "instanceof", "int", "interface", "long", "native", "new",
  "package", "private", "protected", "public", "return", "short", "static",
  "strictfp", "super", "switch", "synchronized", "this", "throw", "throws",
  "transient", "try", "void", "volatile", "while", "var", "record", "sealed",
  "permits", "yield", "true", "false", "null",
]);

type Token = { type: string; value: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(@\w+)|(\b\d[\d_]*(?:\.\d+)?[fFdDlL]?\b)|(\b[A-Za-z_$][\w$]*\b)|([{}()\[\];,.<>=+\-*/%!&|^~?:])|(\s+)|(.)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(code)) !== null) {
    if (m[1]) tokens.push({ type: "comment", value: m[1] });
    else if (m[2]) tokens.push({ type: "string", value: m[2] });
    else if (m[3]) tokens.push({ type: "annotation", value: m[3] });
    else if (m[4]) tokens.push({ type: "number", value: m[4] });
    else if (m[5]) {
      const w = m[5];
      if (JAVA_KEYWORDS.has(w)) tokens.push({ type: "keyword", value: w });
      else if (/^[A-Z]/.test(w)) tokens.push({ type: "type", value: w });
      else tokens.push({ type: "plain", value: w });
    } else if (m[6]) tokens.push({ type: "punct", value: m[6] });
    else tokens.push({ type: "plain", value: m[0] });
  }
  return tokens;
}

const TOKEN_CLASSES: Record<string, string> = {
  comment: "text-emerald-600 dark:text-emerald-400/80 italic",
  string: "text-amber-600 dark:text-amber-300",
  annotation: "text-yellow-600 dark:text-yellow-400",
  number: "text-sky-600 dark:text-sky-300",
  keyword: "text-rose-600 dark:text-rose-400 font-medium",
  type: "text-violet-600 dark:text-violet-300",
  punct: "text-neutral-500 dark:text-neutral-400",
  plain: "",
};

export function CodeBlock({
  code,
  title,
  className,
  highlight = true,
}: {
  code: string;
  title?: string;
  className?: string;
  highlight?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tokens = React.useMemo(
    () => (highlight ? tokenize(code) : null),
    [code, highlight]
  );

  return (
    <div
      className={cn(
        "group relative my-4 overflow-hidden rounded-lg border bg-neutral-50 dark:bg-neutral-900/70",
        className
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/60 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileCode2Icon className="size-3.5" />
          <span className="font-mono">{title ?? "Java"}</span>
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Copier le code"
        >
          {copied ? (
            <>
              <CheckIcon className="size-3.5 text-emerald-500" /> Copié
            </>
          ) : (
            <>
              <CopyIcon className="size-3.5" /> Copier
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">
          {tokens
            ? tokens.map((t, i) => (
                <span key={i} className={TOKEN_CLASSES[t.type]}>
                  {t.value}
                </span>
              ))
            : code}
        </code>
      </pre>
    </div>
  );
}
