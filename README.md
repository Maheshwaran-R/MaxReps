# Max Reps

A mobile gym tracker built with Expo, React Native, and Expo Router.

> This project was migrated from a Vite web prototype. The original web version is preserved in git history (commit `aaef28b`).

## Stack

- Expo SDK 58 / React Native 0.88
- JavaScript (`.jsx`) — no TypeScript
- Expo Router (file-based navigation)
- Jest + `jest-expo` + React Native Testing Library
- ESLint (`eslint-config-expo`) + Prettier

## Run it

```bash
npm install
npm start
```

Scan the QR code with **Expo Go** on Android, or the Camera app on iOS. The phone and computer must be on the same network.

Other targets:

```bash
npm run android   # Android emulator / connected device
npm run ios       # iOS simulator (macOS only)
npm run web       # browser preview
```

## Scripts

| Command                | Purpose                        |
| ---------------------- | ------------------------------ |
| `npm start`            | Start the Expo dev server      |
| `npm run android`      | Start and open on Android      |
| `npm run ios`          | Start and open on iOS          |
| `npm run web`          | Start and open in the browser  |
| `npm test`             | Run Jest tests once            |
| `npm run test:watch`   | Run Jest in watch mode         |
| `npm run lint`         | Lint with Expo's ESLint config |
| `npm run format`       | Format with Prettier           |
| `npm run format:check` | Check formatting               |

## Structure

```text
app/
  _layout.jsx           Root stack, status bar, safe-area provider
  (tabs)/
    _layout.jsx         Bottom tab navigator
    index.jsx           Dashboard
    workouts.jsx        Workouts
  +not-found.jsx        Catch-all 404 route
components/              Screen shell, panel, stat card, button, workout calendar
constants/theme.js       Colors, spacing, radii
data/mockWorkouts.js     Temporary demo workout dates
__tests__/               Jest / React Native Testing Library tests
assets/images/           App icon, splash, adaptive icons
```

## Verification

```bash
npm run format:check && npm run lint && npm test && npx expo export --platform web
npx expo-doctor
```

## Native builds

Expo Go is enough while the app uses JavaScript-only libraries. Features that need custom native code — Apple Health / Google Fit, home-screen widgets, remote push notifications — require a development build. Use [EAS Build](https://docs.expo.dev/build/introduction/) when you get there.

Before publishing, set `ios.bundleIdentifier` and `android.package` in `app.json` and configure EAS Submit.

## Notes

- Install Expo-compatible packages with `npx expo install <package>` instead of `npm install`.
- `npm audit --force` currently suggests downgrading Expo to SDK 54 to fix transitive CLI advisories. Do not run it; wait for upstream fixes.
