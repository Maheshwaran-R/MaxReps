import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, View } from 'react-native'
import { colors, spacing } from '../constants/theme'
import GlassCard from './GlassCard'

function StatCard({ icon, label, value }) {
  return (
    <GlassCard style={styles.card} contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {icon ? <Ionicons name={icon} size={15} color={colors.accent} /> : null}
      </View>
      <Text style={styles.value}>{value}</Text>
    </GlassCard>
  )
}

const styles = StyleSheet.create({
  card: {
    flexBasis: 140,
    flexGrow: 1,
  },
  content: {
    justifyContent: 'space-between',
    gap: spacing.xs,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.xs + 2,
  },
  label: {
    flexShrink: 1,
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 17,
  },
  value: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
})

export default StatCard
