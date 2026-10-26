# AGENTS.md

## Project

Gym Tracker is a client-only React SPA built with Vite. There is no backend, API layer, auth, database, or state library yet.

**JavaScript only** — this project deliberately has no TypeScript. Do not add `.ts`/`.tsx` files, `tsconfig`, type packages, or a typecheck step.

## Commands

- `npm run dev` — Vite dev server (http://localhost:5173 by default)
- `npm test` — run all Vitest tests once
- `npm run test:watch` — Vitest in watch mode
- `npx vitest run src/App.test.jsx` — run one test file
- `npx vitest run -t "navigates to the workouts page"` — run tests matching a name
- `npm run lint` / `npm run lint:fix` — Oxlint. This is not ESLint; there is no ESLint config.
- `npm run format` / `npm run format:check` — Prettier
- `npm run build` — production build to `dist/` (Vite only, no typecheck)
- Full verification: `npm run format:check && npm run lint && npm test && npm run build`

## Architecture

- `src/main.jsx` mounts the app inside `BrowserRouter`.
- `src/App.jsx` is the route table. All routes render inside `Layout` (`src/components/Layout.jsx`), which provides the header, nav, footer, and `<Outlet />`.
- To add a page: create it in `src/pages/`, register it in `src/App.jsx`, and add an entry to `navItems` in `Layout.jsx` if it belongs in the header.
- Styling is a single global stylesheet, `src/index.css`, driven by CSS variables. No Tailwind, CSS Modules, or UI library is installed; extend the existing classes unless a new approach is agreed.
- `vite.config.js` also contains the Vitest config (`jsdom`, globals, `src/test/setup.js`). Keep Vite and test config together there.

## Testing

- Vitest + React Testing Library; colocate tests as `*.test.jsx` next to the code.
- Routed components must be wrapped in `MemoryRouter` in tests. Only `src/main.jsx` supplies `BrowserRouter`.
- jest-dom matchers are registered globally in `src/test/setup.js`.

## Conventions

- Prettier: no semicolons, single quotes, 100-column lines, 2-space indent. Run `npm run format` after editing.
- Components are function components, one default export per page/component file, PascalCase filenames (`DashboardPage.jsx`).
- Use semantic landmarks (`header`, `nav`, `main`) and real links/buttons so existing role-based tests keep working.

## Deployment

`npm run build` produces a static SPA. The host needs an `index.html` fallback for unknown paths; otherwise refreshing `/workouts` returns 404.
