# Gym Tracker

A small React app for logging gym sessions and tracking training progress.

## Stack

- React 19 + Vite
- JavaScript (`.jsx`, no TypeScript)
- React Router
- Vitest + React Testing Library
- Oxlint + Prettier

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at the URL printed by Vite (usually http://localhost:5173).

## Scripts

| Command                | Purpose                               |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the Vite dev server             |
| `npm run build`        | Build the production bundle to `dist` |
| `npm run preview`      | Preview the production build          |
| `npm run lint`         | Lint with Oxlint                      |
| `npm run lint:fix`     | Auto-fix lint issues                  |
| `npm run format`       | Format with Prettier                  |
| `npm run format:check` | Check formatting                      |
| `npm test`             | Run tests once                        |
| `npm run test:watch`   | Run tests in watch mode               |

## Structure

```text
src/
  components/Layout.jsx   App shell with header navigation
  pages/                  One component per route
  App.jsx                 Route definitions
  main.jsx                BrowserRouter entry point
  test/setup.js           Vitest / jest-dom setup
  index.css               Global styles
```

Routes: `/` (dashboard), `/workouts`, and a catch-all 404 page.

## Deployment

`npm run build` outputs a static bundle in `dist/`. Because routing uses
`BrowserRouter`, the host must rewrite unknown paths to `index.html` (SPA
fallback) so deep links such as `/workouts` work on refresh.
