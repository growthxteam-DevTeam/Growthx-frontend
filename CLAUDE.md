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

`npx tsc --noEmit` is currently clean. `npm run lint` has a known baseline of 1 error + 2 warnings —
diff against it rather than assuming a clean tree:

- error: `context/ThemeProvider.tsx:29` (`react-hooks/set-state-in-effect`)
- warning: `app/layout.tsx` unused `runtimeEnv` (the `window.__ENV__` script is commented out)
- warning: `redux/features/api/apiSlice.ts:28` (`window.location.href` redirect on 401)

## State of the repo

Growth X is an application/onboarding site for a cohort program, rebuilt from a scrapped laundry app.
Anything laundry-shaped is dead weight, not a pattern to follow: `formatNaira()` in `lib/utils.ts`,
`context/cartContext.txt` (parked as `.txt` so it doesn't compile), the `"smart-trade-theme"` key in
`context/ThemeProvider.tsx`, and the starter `public/*.svg` files.

What exists:

- `app/page.tsx` renders `AnnouncementBanner` + `Header` + `OnboardingWizard` directly (the wizard is the
  home page). `app/(auth)/layout.tsx` also wraps children in banner + header, so don't nest both.
- `app/(auth)/onboarding/` — the one fully built feature (multi-step application form, see below).
- `app/(root)/example/` — empty skeleton folders only, no `page.tsx`; a template for new slices.
- Redux has only `auth` (persisted via redux-persist) and `apiSlice`. Endpoints: `authApi` (`adminLogin`),
  `applicationsApi` (`submitApplication`), `adminBannerApi` (banner CRUD). The admin login/banner side has
  no UI or backend route yet.
- Metadata in `app/layout.tsx` is still create-next-app defaults; `README.md` is the create-next-app default.

The matching backend is [../growth-x-be](../growth-x-be/CLAUDE.md); only `POST /applications` exists there.

## Architecture

Next.js **App Router**, React 19, TypeScript (strict), Tailwind CSS v4. Path alias `@/*` → project root.

### Providers

`app/layout.tsx` → `providers/Providers.tsx` → `ReduxProvider` + sonner `<Toaster>`. Add app-wide providers
inside `Providers`, not the layout. `context/RefetchContext.tsx` and `context/ThemeProvider.tsx` are not wired
in; `next-themes` is installed but unused. Pick one theme approach before building a toggle.

### Redux / data fetching

State is Redux Toolkit + RTK Query, not React Query or server-component fetching.

- **One API slice.** `redux/features/api/apiSlice.ts` is the only `createApi`; add endpoints with
  `apiSlice.injectEndpoints` in a per-feature `*Api.ts`. Never create a second `createApi`.
- `baseUrl` is `process.env.NEXT_PUBLIC_BASE_URL` (set in `.env.local` / `.env.production`; it must include the
  backend's `/api/v1` prefix). `prepareHeaders` attaches `auth.token`; a 401 dispatches `logout()` and redirects
  to `/admin/login` (that route doesn't exist yet).
- Use the typed `useAppDispatch` / `useAppSelector` from `redux/app/hooks.ts`, never the raw react-redux hooks.

### Runtime env

`constants/runtimeEnv.ts` reads `process.env[key]` with bracket notation on purpose so Next cannot inline the
value at build time. The `window.__ENV__` injection in `app/layout.tsx` is currently commented out, and
`apiSlice` reads `process.env.NEXT_PUBLIC_BASE_URL` directly (build-time inlined). Decide which approach to
use before adding more public env vars.

### Feature-slice convention (follow for new routes)

`app/(auth)/onboarding/` is the reference implementation: `page.tsx` + `_components/`, `_constants/`,
`_hooks/`, `_types/`. Folder names are kebab-case.

- `page.tsx` is a server component that only assembles slice components.
- All state/logic lives in one `use<Feature>` hook (`useOnboarding`); step components are presentational and
  carry `"use client"`.
- `_constants/index.ts` holds the zod schemas **and** the slice's static option arrays; `_types/index.ts` holds
  `z.infer` types. Site-wide copy goes in root `constants/index.ts` (`NAV_LINKS`, `ANNOUNCEMENT_MESSAGE`).
- The onboarding form uses one `useForm` per step and builds a single multipart `FormData` on the final submit
  (passport photo: JPEG/PNG, 2 MB — mirrors the backend's multer limits). Backend validation errors are
  unwrapped from the NestJS `ValidationPipe` shape by `getSubmitErrorMessage()`.
- `ApplicationForm` switches on the active tab with an `assertNever` exhaustiveness guard — add new tabs to
  `OnboardingTabId` and the switch together.

### Forms

react-hook-form + zod via `@hookform/resolvers/zod`. Fields render through
`components/shared/CustomFormField.tsx`, which dispatches on the `FormFieldType` enum rather than exposing
per-type components. Use `components/shared/SubmitButton.tsx` for submit buttons (owns spinner + primary style).

### Styling

Tailwind v4 is configured entirely in `app/globals.css` — there is no `tailwind.config.*`. Light and dark token
sets exist but nothing toggles `.dark`, so treat the app as light-only.

`components/ui/` is shadcn/ui (`components.json`: style `base-nova`, `@base-ui/react` primitives, lucide icons).
Treat it as generated — add primitives with the shadcn CLI. `components/common/` holds small app-wide pieces
(`Container` sets gutter and `max-w-7xl`, `Header`, `AnnouncementBanner`, `ComboboxField`); `components/shared/`
holds larger composed widgets.

Fonts: local Google Sans Flex in `public/fonts/` via `next/font/local`, exposed as `--font-sans`.

### Images

The logo is `public/img/logo.svg`. `next/image` with `fill` needs a `sizes` prop; an image sized by CSS needs
both axes (e.g. `className="h-9 w-auto"`) or the dev server warns.

## Dead files — check before reusing

- `components/shared/DataTable.tsx` and `components/shared/form.tsx` — entirely commented out.
- `components/shared/ComboboxField.tsx` — empty; the real one is `components/common/ComboboxField.tsx`.
- `components/shared/CustomModal.tsx`, `CustomSheet.tsx`, `ToastNotification.tsx` — compile but unused.
  `ToastNotification` fires a sonner toast as a render side effect and returns `null`.

## Next.js version note

`package.json` pins `next@16.3.1` — newer than this model's training data. Before writing App Router code
(routing, data fetching, layouts, metadata), read the bundled docs in `node_modules/next/dist/docs/` rather than
relying on prior knowledge, and heed deprecation notices.

`AGENTS.md` here is generated and re-added by `next dev` — don't edit it away.
