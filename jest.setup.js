// Font assets do not exist in the Jest environment, so report the icon font as
// already loaded instead of letting `useFonts` fail on a missing asset.
jest.mock('expo-font', () => {
  const actual = jest.requireActual('expo-font')

  return { ...actual, useFonts: () => [true, null] }
})

// The first `renderRouter` pays for bundling the whole app, which regularly
// exceeds the 5s default on a cold start.
jest.setTimeout(20000)
