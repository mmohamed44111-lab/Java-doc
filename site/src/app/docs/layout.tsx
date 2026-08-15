import { SiteHeader } from "@/components/site-header";
import { SidebarNav } from "@/components/site-sidebar";
import { PrevNext } from "@/components/doc-page";
import { TableOfContents } from "@/components/table-of-contents";
import { ReadingProgress } from "@/components/reading-progress";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <ReadingProgress />
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 px-4 md:px-8">
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 border-r md:block">
          <SidebarNav />
        </aside>

        <main className="min-w-0 flex-1 px-0 py-8 md:px-10 lg:px-12">
          <div className="mx-auto max-w-3xl">
            {children}
            <PrevNext />
          </div>
        </main>

        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 overflow-y-auto py-8 xl:block">
          <TableOfContents />
        </aside>
      </div>
      <ScrollToTop />
    </div>
  );
}
