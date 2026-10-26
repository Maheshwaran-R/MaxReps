# AGENTS.md

## Project

Max Reps is an Expo SDK 58 / React Native app using Expo Router. JavaScript only — do not add TypeScript, `.ts`/`.tsx` files, `tsconfig`, or type packages. The original Vite web version is preserved in git history (commit `aaef28b`); Vite, React DOM, and web CSS are no longer part of the app.

There is no backend, auth, database, or state library yet.

## Commands

- `npm start` — Expo dev server; scan the QR code with Expo Go
- `npm run android` / `npm run ios` / `npm run web` — open a specific target
- `npx expo start --clear` — restart Metro with a clean cache
- `npm test` — Jest once; `npm run test:watch` for watch mode
- `npx jest __tests__/app.test.jsx` — run one test file
- `npx jest -t "shows the dashboard"` — run tests matching a name
- `npm run lint` / `npx expo lint` — Expo's ESLint config
- `npm run format` / `npm run format:check` — Prettier
- `npx expo-doctor` — validate app config and dependency compatibility
- `npx expo export --platform web` — verify a production bundle (not a store build)
- Full check: `npm run format:check && npm run lint && npm test && npx expo export --platform web`

## Architecture

- `app/_layout.jsx` is the root layout: `SafeAreaProvider`, status bar, and the root `Stack`.
- `app/(tabs)/_layout.jsx` defines the bottom tabs. SDK 58 only shows tabs declared with `<Tabs.Screen>`, so add both the route file and a `Tabs.Screen` entry.
- Routes are files. `(tabs)` is a route group and does not appear in the URL: `app/(tabs)/workouts.jsx` is `/workouts`.
- Use `Link`, `useRouter`, and `useLocalSearchParams` from `expo-router`. Do not add React Navigation screen definitions manually.
- `components/Screen.jsx` is the shared page shell (safe area + scroll + heading). Reuse it for new screens.
- `components/WorkoutCalendar.jsx` is the dashboard month grid with a month picker; `data/mockWorkouts.js` holds temporary logged dates until real storage exists.
- Colors, spacing, and radii live in `constants/theme.js`. Style with `StyleSheet.create`; there is no Tailwind, CSS, or DOM.
- Tests live in `__tests__/`, never inside `app/` — every file in `app/` must be a route or layout.

## Expo conventions and gotchas

- Install native/Expo packages with `npx expo install <package>`, not `npm install`, so versions match SDK 58. Run `npx expo-doctor` after dependency changes.
- Expo Go runs JS-only code. Native modules (HealthKit/Google Fit, widgets, remote push, custom native code) require a development build; plan those features with EAS Build.
- Do not rely on a background JavaScript timer. For rest timers, schedule a local notification at the end time instead.
- No `window`, `document`, or `localStorage`. Use React Native primitives and, when persistence is added, `expo-sqlite` or AsyncStorage installed via `npx expo install`.
- `ios/` and `android/` are generated folders and are gitignored. Do not create or edit them by hand.
- Do not run `npm audit fix --force`: it currently proposes downgrading Expo to SDK 54. The reported advisories are transitive Expo CLI dependencies.
- Metro is the bundler (`npx expo export`), not Vite. There is no `vite.config.js`.

## Testing

- Jest preset `jest-expo` with `@testing-library/react-native`; tests are `__tests__/*.test.jsx`.
- `renderRouter('./app', { initialUrl })` from `expo-router/testing-library` returns a **promise** in SDK 58 — always `await` it and `await testRouter.push(...)`.
- `jest.setup.js` mocks `@expo/vector-icons` because font asset loading fails in the Jest environment. Keep that mock when adding icon sets.
- Prefer role/text queries; page titles set `accessibilityRole="header"`.

## Conventions

- Prettier: no semicolons, single quotes, 100-column lines, 2-space indent. Run `npm run format` after edits.
- Components are function components with one default export per file; PascalCase filenames (`DashboardScreen.jsx`).
- Keep navigation accessible: real links/buttons, semantic headings, and labels.

## Deployment

EAS Build/Submit. `app.json` has no `ios.bundleIdentifier` or `android.package` yet; set them before the first store build. `expo export` only verifies the JS bundle and is not a substitute for a native build.
