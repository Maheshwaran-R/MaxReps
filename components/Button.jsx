import { Pressable, StyleSheet, Text } from 'react-native'
import { colors, radius, spacing } from '../constants/theme'

function Button({ label, ...pressableProps }) {
  return (
    <Pressable
      accessibilityRole="button"
      {...pressableProps}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    shadowColor: colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  pressed: {
    backgroundColor: colors.accentPressed,
  },
  label: {
    color: colors.onAccent,
    fontSize: 15,
    fontWeight: '700',
  },
})

export default Button
