# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server (http://localhost:3000)
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint       # eslint — the script is bare `eslint`, not `next lint`
npx tsc --noEmit   # type-check only — faster than a full build
```

There is no test setup in this project.

**`npm run build` and `npx tsc --noEmit` currently fail with 5 errors** — all from dead/broken files
(see *Dead and broken files*). Diff against that known baseline rather than assuming a clean tree:

```
components/shared/DataTable.tsx(13,23)  TS2307  '@/components/ui/dataTable'
components/shared/DataTable.tsx(14,27)  TS2307  '@/components/common/Loaders/TableSkeleton'
components/shared/DataTable.tsx(15,29)  TS2307  '@/hooks/useDebounce'
components/shared/DataTable.tsx(22,31)  TS2344  TData does not satisfy TableFeatures
components/shared/ScreenLoader.tsx(3,18) TS2307 '@/components/common/Logo'
```

`npm run lint` likewise fails with a known baseline of 1 error + 1 warning:
`context/ThemeProvider.tsx:29` (`react-hooks/set-state-in-effect`) and the unused `ResourceTable` in
`components/shared/DataTable.tsx`.

## State of the repo — read this first

This repo began as **Laundry Point**, a laundry pickup/delivery app. Commit `b971363 feat: landing page
deleted` removed all of `components/landing-page/` and gutted `app/page.tsx`; it is now being rebuilt as
**Growth X**. The product is not yet defined in code — ask before inventing one.

What survives is a Next 16 + Redux Toolkit scaffold plus laundry residue. Treat anything laundry-shaped
as dead weight to replace, not as a pattern to follow:

| Laundry leftover | Status |
| --- | --- |
| `constants/index.ts` | Laundry copy has been cleared out — the file is now empty, ready for Growth X site-wide content |
| `context/cartContext.txt` | Laundry cart context parked as a `.txt` so it doesn't compile — reference only |
| `redux/features/basket/basketSlice.ts` | Laundry basket (providers, garments) — still wired into the store |
| `formatNaira()` in `lib/utils.ts` | Laundry pricing helper |
| `public/images/` | Gone — the directory no longer exists |
| `components/common/Logo.tsx` | Deleted with the landing page, which is why `ScreenLoader` no longer compiles |

The only routes that exist are `app/page.tsx` (a bare `<h1>hello</h1>`), `app/loading.tsx` and
`app/not-found.tsx`. `app/(auth)/` is an empty directory. The Redux feature folders sketch the intended
direction — `auth`, `marketing` (both files empty), `apps/email` — but only `auth` and `basket` are
implemented.

## Architecture

Next.js **App Router** (`app/`), React 19, TypeScript (strict), Tailwind CSS v4. Path alias `@/*` → project root.

### Provider chain

`app/layout.tsx` → `providers/Providers.tsx` → `ReduxProvider` + sonner `<Toaster position="top-right" richColors />`.
Add new app-wide providers inside `Providers`, not in the layout.

Two providers exist but are **not** wired in: `context/RefetchContext.tsx` (commented out inside `Providers`)
and `context/ThemeProvider.tsx` — the latter is a hand-rolled light/dark context carried over from an unrelated
project (its localStorage key is still `"smart-trade-theme"`), and `next-themes` is in `package.json` but unused.
Pick one before building any theme toggle; don't run both.

### Redux / data fetching

State is Redux Toolkit, not React Query or server-component fetching. `redux/app/store.ts` registers
`auth`, `basket`, and a single RTK Query `apiSlice`.

- **One API slice.** `redux/features/api/apiSlice.ts` is the only `createApi` call; every endpoint is added
  through `apiSlice.injectEndpoints` in a per-feature `*Api.ts` (see `authApi.ts`, `apps/email/emailApi.ts`).
  Do not create a second `createApi`.
- **`baseUrl` is a placeholder.** It currently points at `https://rickandmortyapi.com/api` with the real
  backend commented out above it, which is why `emailApi` mixes a `fetchCharacters` demo query with the real
  `fetchEmails` one. `prepareHeaders` attaches `auth.token` as a bearer token.
- Use the typed `useAppDispatch` / `useAppSelector` from `redux/app/hooks.ts`, never the raw react-redux hooks.

### Runtime env

`app/layout.tsx` sets `export const dynamic = 'force-dynamic'` and inlines `window.__ENV__` via a script tag
using `constants/runtimeEnv.ts`. That file reads `process.env[key]` with **bracket notation on purpose**, so
Next cannot inline the value at build time and one image can be deployed to multiple environments. Read public
env vars through `getRuntimeEnv()`, not `process.env.NEXT_PUBLIC_*` directly, and add new keys to both the
`RuntimeEnv` type and `RUNTIME_ENV_KEYS`.

`NEXT_PUBLIC_BASE_URL` is the only declared key, and both `.env.local` and `.env.production` are currently
empty files — nothing reads it yet.

### Feature-slice convention (follow this for new routes)

`app/(root)/example/` is an empty skeleton showing the intended shape: `_components/`, `_constants/`,
`_hooks/`, `_types/`, `lib/`. Folder names are kebab-case, lowercase.

- `page.tsx` is a server component that only lays out and assembles slice components.
- All state/logic lives in one `use<Feature>` hook returning a flat object; components stay presentational
  and hold the `"use client"` directive.
- `_constants/index.ts` holds both the zod schema and the slice's static content. Site-wide content goes in
  the root `constants/index.ts` — never inline arrays of copy into components.
- `_lib/` (or `lib/`) is for pure logic; `_constants/` files stay data-only.

### Forms

react-hook-form + zod via `@hookform/resolvers/zod`. Every field renders through
`components/shared/CustomFormField.tsx`, which dispatches on the `FormFieldType` enum (input, textarea,
phoneInput, select, combobox, checkbox, date, radio) rather than exposing per-type components. Buttons use
`components/shared/SubmitButton.tsx`, which owns the loading spinner and the primary style.

### Styling

Tailwind v4 is configured entirely in `app/globals.css` (`@import "tailwindcss"`, `@import "shadcn/tailwind.css"`,
`@theme inline`, `:root` / `.dark` CSS variables) — there is no `tailwind.config.*`. `--primary` is a blue.
Both light and dark token sets are defined, but nothing toggles the `.dark` class today, and surviving chrome
hardcodes `bg-white` / `text-slate-*` / `text-gray-*`, so the app is effectively light-mode only.

`components/ui/` is shadcn/ui (`components.json`: style `base-nova`, base color `neutral`, lucide icons,
`@base-ui/react` primitives). Treat it as generated — add new primitives with the shadcn CLI instead of
hand-writing them. `components/common/` holds small app-wide pieces (`Container` sets the page gutter and
`max-w-7xl`, `ComboboxField`); `components/shared/` holds the larger composed widgets.

Fonts: local Google Sans Flex files in `public/fonts/`, loaded with `next/font/local` in `app/layout.tsx`
and exposed as `--font-sans`.

### Images

Section images belong under `public/images/<section>/`, one set per section — do not reuse an image across
sections. `next/image` with `fill` always needs a `sizes` prop, and an image sized by CSS needs both axes set
(e.g. `className="h-8 w-auto"`), or the dev server logs warnings.

## Dead and broken files — check before reusing

- `components/shared/DataTable.tsx` — imports three modules that don't exist plus a `@tanstack/react-table`
  generic error; its exported `ResourceTable` is unused. Four of the five baseline errors.
- `components/shared/ScreenLoader.tsx` — compiles only once `components/common/Logo.tsx` is restored or the
  import is replaced. It is rendered by `app/loading.tsx`, so route-level loading UI is broken until then.
- `components/shared/form.tsx` — entirely commented out.
- `components/shared/ComboboxField.tsx` — empty file. The real one is `components/common/ComboboxField.tsx`.
- `redux/features/marketing/{marketingSlice,marketingApi}.ts` and `redux/features/apps/email/emailSlice.ts`
  — empty files, placeholders only.
- `components/shared/CustomModal.tsx`, `CustomSheet.tsx`, `ToastNotification.tsx` — compile, but nothing
  imports them yet. Note `ToastNotification` is a component that fires a sonner toast as a render side effect
  and returns `null`; `emailApi.ts` imports it without using it.
- `README.md` is the unmodified create-next-app default and holds nothing project-specific; `app/layout.tsx` metadata is still create-next-app defaults; `public/*.svg` are starter assets.

## Next.js version note

`package.json` pins `next@16.3.1` — newer than this model's training data, with breaking API/convention
changes from earlier versions. Before writing App Router code (routing, data fetching, layouts, metadata),
consult the bundled docs in `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`,
`04-community`) rather than prior knowledge, and heed deprecation notices.

`AGENTS.md` is generated and re-added by `next dev` (`node_modules/next/dist/server/lib/generate-agent-files.js`)
and just restates the above — don't edit its content away.
