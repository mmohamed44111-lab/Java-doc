# Manuel Java — documentation site

A Next.js (App Router) static site that turns the Java manual into a modern
documentation experience. Deployed to GitHub Pages via `output: "export"`.

## UI library — Modern UI

The interface is built on [**Modern UI**](https://modern-ui.org/docs/), a
shadcn/ui-inspired library that pairs Radix primitives with
[motion](https://motion.dev) animations.

Modern UI is distributed as copy-in source (like shadcn/ui), so its components
live in the repo:

```
src/components/modern-ui/   # vendored Modern UI components
```

To add another component from the library:

```bash
npx @modern-core/ui add <component>
```

The CLI writes into `src/components/modern-ui/` (configured through
`components.json`, whose `ui` alias points there). Components import `cn` from
`@/lib/utils`.

### Modern UI pieces in use

| Component | Where |
| --- | --- |
| `button`, `badge`, `card`, `alert`, `table`, `tabs`, `accordion` | throughout the docs pages |
| `sheet`, `scroll-area`, `tooltip`, `breadcrumb` | header, sidebar, doc chrome |
| `command` + `dialog` | ⌘K search palette (`src/components/docs-search.tsx`) |
| `rainbow-button`, `sparkles-text`, `animated-gradient-text`, `number-counter` | landing hero & CTA |
| `terminal-block` | JDK install commands |

### Theme tokens

`src/app/globals.css` carries Modern UI's design tokens on top of the existing
Tailwind v4 theme:

- the `--color-1` … `--color-5` rainbow palette (raw HSL triplets, as Modern UI
  expects — use them as `hsl(var(--color-1))`),
- the `gradient`, `rainbow`, `accordion-down/up` keyframes the library relies
  on, plus `shine`, `float` and `aurora` used by this site,
- `bg-dot-pattern` and `no-scrollbar` utilities,
- a `prefers-reduced-motion` block that neutralises all of the above.

Local edits to vendored components are marked with a comment so they survive a
future re-sync (e.g. `asChild` support on `rainbow-button` and `breadcrumb`,
extra `info`/`success`/`warning` variants on `alert`).

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into ./out
npm run lint
```
