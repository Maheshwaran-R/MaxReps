import { StyleSheet, View } from 'react-native'
import { colors, radius, spacing } from '../constants/theme'

function Panel({ children }) {
  return <View style={styles.panel}>{children}</View>
}

const styles = StyleSheet.create({
  panel: {
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
})

export default Panel
