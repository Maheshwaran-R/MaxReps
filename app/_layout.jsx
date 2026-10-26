import Ionicons from '@expo/vector-icons/Ionicons'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { colors } from '../constants/theme'

// Keep the splash screen up until the icon font is ready, otherwise the first
// frame renders every `Ionicons` as an empty <Text> until the font resolves.
SplashScreen.preventAutoHideAsync().catch(() => {})

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(Ionicons.font)

  useEffect(() => {
    if (!fontsLoaded && !fontError) return

    if (fontError) {
      console.warn('Failed to load the Ionicons font', fontError)
    }

    SplashScreen.hideAsync().catch(() => {})
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </SafeAreaProvider>
  )
}
