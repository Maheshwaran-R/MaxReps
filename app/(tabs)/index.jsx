import { Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../../components/Button'
import NotificationBell from '../../components/NotificationBell'
import Panel from '../../components/Panel'
import Screen from '../../components/Screen'
import StatCard from '../../components/StatCard'
import WorkoutCalendar from '../../components/WorkoutCalendar'
import { colors, spacing } from '../../constants/theme'

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const stats = [
  { label: 'Workouts this week', value: '0', icon: 'barbell-outline' },
  { label: 'Total volume', value: '0 kg', icon: 'trending-up-outline' },
  { label: 'Current streak', value: '0 days', icon: 'flame-outline' },
]

function dateLabel(date) {
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`
}

function greeting(hour) {
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

export default function DashboardScreen() {
  const now = new Date()

  return (
    <Screen
      eyebrow={dateLabel(now)}
      title={greeting(now.getHours())}
      action={<NotificationBell />}
      //subtitle="See your training volume, streaks, and recent sessions at a glance."
    >
      <WorkoutCalendar />

      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <StatCard key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />
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
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 22,
  },
})
