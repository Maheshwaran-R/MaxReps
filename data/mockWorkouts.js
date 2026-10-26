// Temporary demo data for the dashboard calendar.
// Replace this module with real queries when workout persistence (expo-sqlite) lands.

function pad(value) {
  return String(value).padStart(2, '0')
}

export function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const WORKOUT_WEEKDAYS = [1, 3, 5] // Monday, Wednesday, Friday

function buildMockWorkoutDates(reference = new Date()) {
  const dates = []

  for (let day = 1; day <= reference.getDate(); day += 1) {
    const date = new Date(reference.getFullYear(), reference.getMonth(), day)
    if (WORKOUT_WEEKDAYS.includes(date.getDay())) {
      dates.push(toDateKey(date))
    }
  }

  const previousMonth = new Date(reference.getFullYear(), reference.getMonth() - 1, 1)
  const previousMonthDays = new Date(
    previousMonth.getFullYear(),
    previousMonth.getMonth() + 1,
    0,
  ).getDate()

  for (let day = 1; day <= previousMonthDays; day += 1) {
    const date = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), day)
    if (WORKOUT_WEEKDAYS.includes(date.getDay())) {
      dates.push(toDateKey(date))
    }
  }

  return dates
}

export const mockWorkoutDates = buildMockWorkoutDates()
