import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { Pressable, StyleSheet } from 'react-native'
import { colors } from '../constants/theme'

const SIZE = 36

function NotificationBell({ onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Notifications"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.2)',
          'rgba(255, 255, 255, 0.05)',
          'rgba(255, 255, 255, 0.1)',
        ]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        pointerEvents="none"
        style={styles.fill}
      />

      <Ionicons name="notifications-outline" size={17} color={colors.accent} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.glassSurface,
    borderWidth: 1,
    borderColor: colors.accent,
    // Half the side, not `radius.pill`: oversized radii make Android rasterise
    // the clipped fill as a polygon instead of a circle.
    borderRadius: SIZE / 2,
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: SIZE / 2,
  },
  pressed: {
    opacity: 0.6,
  },
})

export default NotificationBell
