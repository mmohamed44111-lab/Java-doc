"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, FileCode2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

/* Minimal Java / generic syntax highlighter (no external deps) */
const JAVA_KEYWORDS = new Set([
  "abstract",
  "assert",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extends",
  "final",
  "finally",
  "float",
  "for",
  "goto",
  "if",
  "implements",
  "import",
  "instanceof",
  "int",
  "interface",
  "long",
  "native",
  "new",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "strictfp",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "try",
  "void",
  "volatile",
  "while",
  "var",
  "record",
  "sealed",
  "permits",
  "yield",
  "true",
  "false",
  "null",
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

function renderLines(tokens: Token[] | null, code: string) {
  const rows: React.ReactNode[] = [];
  let current: React.ReactNode[] = [];
  let key = 0;

  const pushRow = () => {
    rows.push(
      <span
        key={rows.length}
        className="grid grid-cols-[2rem_1fr] gap-3 hover:bg-accent/40"
      >
        <span className="select-none text-right text-muted-foreground/40">
          {rows.length + 1}
        </span>
        <span className="whitespace-pre">
          {current.length ? current : "\u00A0"}
        </span>
      </span>,
    );
    current = [];
  };

  if (!tokens) {
    code.split("\n").forEach((line) => {
      current = [line];
      pushRow();
    });
    return rows;
  }

  for (const token of tokens) {
    const parts = token.value.split("\n");
    parts.forEach((part, i) => {
      if (i > 0) pushRow();
      if (part) {
        current.push(
          <span key={key++} className={TOKEN_CLASSES[token.type]}>
            {part}
          </span>,
        );
      }
    });
  }
  pushRow();
  return rows;
}

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
    [code, highlight],
  );

  return (
    <div
      className={cn(
        "group relative my-5 overflow-hidden rounded-xl border border-border bg-background shadow-xs transition-all duration-300 hover:border-primary/30 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <FileCode2Icon className="ml-1 size-3.5" />
          <span className="font-mono">{title ?? "Java"}</span>
        </div>
        <button
          onClick={onCopy}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground opacity-0 transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:opacity-100 group-hover:opacity-100"
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
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-[13px] leading-relaxed">
          <code className="grid font-mono">{renderLines(tokens, code)}</code>
        </pre>
      </div>
    </div>
  );
}
