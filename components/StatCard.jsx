import { StyleSheet, Text, View } from 'react-native'
import { colors, radius, spacing } from '../constants/theme'

function StatCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexBasis: 140,
    flexGrow: 1,
    gap: spacing.xs,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
  },
  value: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
})

export default StatCard
