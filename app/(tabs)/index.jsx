import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../../components/Button'
import Panel from '../../components/Panel'
import Screen from '../../components/Screen'
import StatCard from '../../components/StatCard'
import { colors, spacing } from '../../constants/theme'

const stats = [
  { label: 'Workouts this week', value: '0' },
  { label: 'Total volume', value: '0 kg' },
  { label: 'Current streak', value: '0 days' },
]

export default function DashboardScreen() {
  return (
    <Screen
      eyebrow="Overview"
      title="Dashboard"
      subtitle="See your training volume, streaks, and recent sessions at a glance."
    >
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </View>

      <Panel>
        <Text accessibilityRole="header" style={styles.panelTitle}>
          Recent workouts
        </Text>
        <Text style={styles.body}>
          No workouts logged yet. Your latest sessions will appear here.
        </Text>
        <Link href="/workouts" asChild>
          <Button label="View workouts" />
        </Link>
      </Panel>
    </Screen>
  )
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  panelTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
})
