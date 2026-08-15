"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Table as BaseTable,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/modern-ui/table";

/**
 * Modern UI's <Table /> intentionally ships without a scroll wrapper so it can
 * be made sticky. For documentation tables we want a rounded, scrollable card,
 * so this thin wrapper adds it.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative my-5 w-full overflow-x-auto rounded-xl border border-border bg-background shadow-xs transition-colors hover:border-primary/30">
    <BaseTable
      ref={ref}
      className={cn(
        "[&_thead_tr]:bg-muted/50 [&_th]:px-4 [&_td]:px-4 [&_td]:py-3",
        className,
      )}
      {...props}
    />
  </div>
));
Table.displayName = "DocTable";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
