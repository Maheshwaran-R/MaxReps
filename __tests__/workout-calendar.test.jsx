import { fireEvent, render, screen } from '@testing-library/react-native'
import WorkoutCalendar from '../components/WorkoutCalendar'

const TODAY = new Date(2026, 9, 27) // October 27, 2026
const LOGGED_DATES = ['2026-10-05', '2026-10-07', '2026-10-09']

function renderCalendar(overrides = {}) {
  return render(<WorkoutCalendar loggedDates={LOGGED_DATES} today={TODAY} {...overrides} />)
}

describe('WorkoutCalendar', () => {
  it('shows the heading and the current month', async () => {
    await renderCalendar()

    expect(screen.getByRole('header', { name: 'Your workout days' })).toBeTruthy()
    expect(screen.getByText('October 2026')).toBeTruthy()
  })

  it('marks logged days and today', async () => {
    await renderCalendar()

    expect(screen.getByLabelText('October 5, workout logged')).toBeTruthy()
    expect(screen.getByLabelText('October 6')).toBeTruthy()
    expect(screen.getByLabelText('October 27, today')).toBeTruthy()
  })

  it('shows the monthly workout count', async () => {
    await renderCalendar()

    expect(screen.getByText('3 workouts')).toBeTruthy()
  })

  it('changes month from the dropdown', async () => {
    await renderCalendar()

    await fireEvent.press(screen.getByLabelText('Change month, currently October 2026'))
    await fireEvent.press(screen.getByLabelText('September 2026'))

    expect(screen.getByText('September 2026')).toBeTruthy()
    expect(screen.getByText('No workouts logged this month')).toBeTruthy()
  })

  it('steps between months with the arrows', async () => {
    await renderCalendar()

    await fireEvent.press(screen.getByLabelText('Previous month'))
    expect(screen.getByText('September 2026')).toBeTruthy()

    await fireEvent.press(screen.getByLabelText('Next month'))
    expect(screen.getByText('October 2026')).toBeTruthy()
  })
})
