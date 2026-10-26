import Ionicons from '@expo/vector-icons/Ionicons'
import { BlurTargetView, BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useMemo, useRef, useState } from 'react'
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
  const blurTargetRef = useRef(null)

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
    <View style={styles.cardShadow}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.82)', 'rgba(198, 255, 46, 0.5)', 'rgba(0, 255, 170, 0.72)']}
        locations={[0, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardRing}
      >
        <View style={styles.card}>
          {/* Colour field under the glass: blurred into a smooth frosted wash. */}
          <BlurTargetView ref={blurTargetRef} pointerEvents="none" style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={['#223c10', '#0a170f', '#032a22']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </BlurTargetView>

          <BlurView
            blurTarget={blurTargetRef}
            blurMethod="dimezisBlurViewSdk31Plus"
            intensity={25}
            tint="default"
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          {/* Milky frost tint. */}
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.05)',
              'rgba(255, 255, 255, 0.01)',
              'rgba(0, 255, 170, 0.05)',
            ]}
            locations={[0, 0.42, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          {/* Specular sheen across the top-left corner. */}
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.08)',
              'rgba(255, 255, 255, 0.005)',
              'rgba(255, 255, 255, 0)',
            ]}
            locations={[0, 0.22, 0.55]}
            start={{ x: 0.05, y: 0 }}
            end={{ x: 0.95, y: 1 }}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <View style={styles.titleGroup}>
                <View style={styles.titleDot} />
                <Text accessibilityRole="header" style={styles.title}>
                  Your workout days
                </Text>
              </View>

              {loggedCount > 0 ? (
                <View style={styles.countBadge}>
                  <View style={styles.legendDot} />
                  <Text style={styles.countText}>
                    {`${loggedCount} ${loggedCount === 1 ? 'workout' : 'workouts'}`}
                  </Text>
                </View>
              ) : null}
            </View>

            <View style={styles.controls}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous month"
                hitSlop={8}
                onPress={() => stepMonth(-1)}
                style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
              >
                <Ionicons name="chevron-back" size={13} color={colors.text} />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Change month, currently ${monthLabel}`}
                onPress={() => setPickerVisible(true)}
                style={({ pressed }) => [styles.monthButton, pressed && styles.pressed]}
              >
                <Text style={styles.monthLabel}>{monthLabel}</Text>
                <Ionicons name="chevron-down" size={12} color={colors.muted} />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next month"
                hitSlop={8}
                onPress={() => stepMonth(1)}
                style={({ pressed }) => [styles.arrowButton, pressed && styles.pressed]}
              >
                <Ionicons name="chevron-forward" size={13} color={colors.text} />
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

            {loggedCount === 0 ? (
              <Text style={styles.emptyText}>No workouts logged this month</Text>
            ) : null}

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
                      <Ionicons name="close" size={16} color={colors.muted} />
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
                      <Ionicons name="chevron-back" size={13} color={colors.muted} />
                    </Pressable>
                    <Text style={styles.yearText}>{viewYear}</Text>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Next year"
                      hitSlop={8}
                      onPress={() => setViewYear((year) => year + 1)}
                      style={({ pressed }) => [styles.yearButton, pressed && styles.pressed]}
                    >
                      <Ionicons name="chevron-forward" size={13} color={colors.muted} />
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
                            style={[
                              styles.monthOptionText,
                              selected && styles.monthOptionTextSelected,
                            ]}
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
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  cardShadow: {
    borderRadius: radius.xl,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 16 },
    elevation: 18,
  },
  cardRing: {
    padding: 1.5,
    borderRadius: radius.xl + 1.5,
  },
  card: {
    overflow: 'hidden',
    backgroundColor: colors.glassSurface,
    borderRadius: radius.xl,
  },
  content: {
    gap: spacing.xs + 2,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs + 2,
  },
  titleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  title: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 15,
    includeFontPadding: false,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    height: 18,
    paddingHorizontal: spacing.sm - 1,
    backgroundColor: 'rgba(198, 255, 46, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(198, 255, 46, 0.28)',
    borderRadius: radius.pill,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  arrowButton: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: radius.pill,
  },
  monthButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    height: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: radius.pill,
  },
  monthLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  pressed: {
    opacity: 0.6,
  },
  weekdayRow: {
    flexDirection: 'row',
  },
  weekdayText: {
    color: 'rgba(237, 248, 238, 0.6)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.2857%',
    height: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
  },
  dayCircleLogged: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.7,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  dayCircleToday: {
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: 'rgba(198, 255, 46, 0.12)',
  },
  dayText: {
    color: colors.text,
    fontSize: 10,
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
  legendDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
  },
  countText: {
    color: colors.accent,
    fontSize: 9,
    fontWeight: '800',
  },
  emptyText: {
    color: 'rgba(237, 248, 238, 0.72)',
    fontSize: 10,
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
    maxWidth: 340,
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: '#0d1711',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: radius.xl,
    shadowColor: '#000000',
    shadowOpacity: 0.55,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  closeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  yearButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  yearText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  monthOption: {
    flexBasis: '30%',
    flexGrow: 1,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
  },
  monthOptionSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  monthOptionText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  monthOptionTextSelected: {
    color: colors.onAccent,
    fontWeight: '800',
  },
})

export default WorkoutCalendar
