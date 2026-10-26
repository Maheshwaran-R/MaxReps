import { Ionicons } from '@expo/vector-icons'
import { useMemo, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, radius, spacing } from '../constants/theme'
import { mockWorkoutDates, toDateKey } from '../data/mockWorkouts'

const MONTH_NAMES = [
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

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

// Monday-first index: Sunday (0) becomes 6.
function leadingBlankCount(year, month) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

function buildMonthCells(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = Array(leadingBlankCount(year, month)).fill(null)

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day)
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

function WorkoutCalendar({ loggedDates = mockWorkoutDates, today = new Date() }) {
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [pickerVisible, setPickerVisible] = useState(false)

  const loggedSet = useMemo(() => new Set(loggedDates), [loggedDates])
  const cells = useMemo(() => buildMonthCells(viewYear, viewMonth), [viewYear, viewMonth])
  const monthLabel = `${MONTH_NAMES[viewMonth]} ${viewYear}`
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const loggedCount = cells.reduce((count, day) => {
    if (!day) return count
    const date = new Date(viewYear, viewMonth, day)
    return loggedSet.has(toDateKey(date)) ? count + 1 : count
  }, 0)

  function stepMonth(offset) {
    const next = new Date(viewYear, viewMonth + offset, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  function selectMonth(monthIndex) {
    setViewMonth(monthIndex)
    setPickerVisible(false)
  }

  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>Training calendar</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Your workout days
        </Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          hitSlop={8}
          onPress={() => stepMonth(-1)}
          style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-back" size={16} color={colors.muted} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Change month, currently ${monthLabel}`}
          onPress={() => setPickerVisible(true)}
          style={({ pressed }) => [styles.monthButton, pressed && styles.pressed]}
        >
          <Text style={styles.monthLabel}>{monthLabel}</Text>
          <Ionicons name="chevron-down" size={14} color={colors.muted} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next month"
          hitSlop={8}
          onPress={() => stepMonth(1)}
          style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
        >
          <Ionicons name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>
      </View>

      <View>
        <View style={styles.weekdayRow}>
          {WEEKDAY_LABELS.map((label, index) => (
            <View key={`${label}-${index}`} style={styles.cell}>
              <Text style={styles.weekdayText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.grid}>
          {cells.map((day, index) => {
            if (!day) {
              return <View key={`blank-${index}`} style={styles.cell} />
            }

            const date = new Date(viewYear, viewMonth, day)
            const dateKey = toDateKey(date)
            const isLogged = loggedSet.has(dateKey)
            const isToday =
              viewYear === today.getFullYear() &&
              viewMonth === today.getMonth() &&
              day === today.getDate()
            const isFuture = date > todayStart
            const label = `${MONTH_NAMES[viewMonth]} ${day}${
              isLogged ? ', workout logged' : ''
            }${isToday ? ', today' : ''}`

            return (
              <View key={dateKey} accessible accessibilityLabel={label} style={styles.cell}>
                <View
                  style={[
                    styles.dayCircle,
                    isLogged && styles.dayCircleLogged,
                    isToday && !isLogged && styles.dayCircleToday,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isFuture && !isLogged && styles.dayTextFuture,
                      isToday && !isLogged && styles.dayTextToday,
                      isLogged && styles.dayTextLogged,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.legend}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Logged</Text>
        </View>
        <Text style={styles.countText}>
          {loggedCount === 0
            ? 'No workouts logged this month'
            : `${loggedCount} ${loggedCount === 1 ? 'workout' : 'workouts'}`}
        </Text>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={pickerVisible}
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Dismiss month picker"
            onPress={() => setPickerVisible(false)}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select month</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close month picker"
                hitSlop={8}
                onPress={() => setPickerVisible(false)}
                style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
              >
                <Ionicons name="close" size={18} color={colors.muted} />
              </Pressable>
            </View>

            <View style={styles.yearRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous year"
                hitSlop={8}
                onPress={() => setViewYear((year) => year - 1)}
                style={({ pressed }) => [styles.yearButton, pressed && styles.pressed]}
              >
                <Ionicons name="chevron-back" size={16} color={colors.muted} />
              </Pressable>
              <Text style={styles.yearText}>{viewYear}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next year"
                hitSlop={8}
                onPress={() => setViewYear((year) => year + 1)}
                style={({ pressed }) => [styles.yearButton, pressed && styles.pressed]}
              >
                <Ionicons name="chevron-forward" size={16} color={colors.muted} />
              </Pressable>
            </View>

            <View style={styles.monthGrid}>
              {MONTH_NAMES.map((name, index) => {
                const selected = index === viewMonth
                return (
                  <Pressable
                    key={name}
                    accessibilityRole="button"
                    accessibilityLabel={`${name} ${viewYear}`}
                    accessibilityState={{ selected }}
                    onPress={() => selectMonth(index)}
                    style={({ pressed }) => [
                      styles.monthOption,
                      selected && styles.monthOptionSelected,
                      pressed && !selected && styles.pressed,
                    ]}
                  >
                    <Text
                      style={[styles.monthOptionText, selected && styles.monthOptionTextSelected]}
                    >
                      {name.slice(0, 3)}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  heading: {
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  arrowButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  monthButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 36,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  monthLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.65,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  weekdayText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.2857%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: '84%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
  dayCircleLogged: {
    backgroundColor: colors.accent,
  },
  dayCircleToday: {
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  dayText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
  },
  dayTextFuture: {
    color: colors.muted,
    opacity: 0.5,
  },
  dayTextToday: {
    color: colors.accent,
    fontWeight: '700',
  },
  dayTextLogged: {
    color: colors.onAccent,
    fontWeight: '800',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  legendText: {
    color: colors.muted,
    fontSize: 12,
  },
  countText: {
    color: colors.muted,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.overlay,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    gap: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  yearButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  yearText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  monthOption: {
    flexBasis: '30%',
    flexGrow: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  monthOptionSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  monthOptionText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  monthOptionTextSelected: {
    color: colors.onAccent,
    fontWeight: '800',
  },
})

export default WorkoutCalendar
