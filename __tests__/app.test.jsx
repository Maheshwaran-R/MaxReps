import {
  act,
  cleanup,
  fireEvent,
  renderRouter,
  screen,
  testRouter,
} from 'expo-router/testing-library'

afterEach(() => {
  cleanup()
  jest.useRealTimers()
})

describe('Max Reps app', () => {
  it('shows the dashboard at the root route', async () => {
    await renderRouter('./app', { initialUrl: '/' })

    expect(
      await screen.findByRole('header', { name: /good (morning|afternoon|evening)/i }),
    ).toBeTruthy()
  })

  it('shows today’s date above the greeting', async () => {
    await renderRouter('./app', { initialUrl: '/' })

    const today = new Date()
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      today.getDay()
    ]
    const month = [
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
    ][today.getMonth()]

    expect(screen.getByText(`${weekday}, ${today.getDate()} ${month}`)).toBeTruthy()
  })

  it('shows the notification button beside the greeting', async () => {
    await renderRouter('./app', { initialUrl: '/' })

    expect(await screen.findByRole('button', { name: 'Notifications' })).toBeTruthy()
  })

  it('opens the workouts screen from the dashboard link', async () => {
    await renderRouter('./app', { initialUrl: '/' })

    await act(async () => {
      fireEvent.press(screen.getByText('View workouts'))
    })

    expect(await screen.findByRole('header', { name: 'Workouts' })).toBeTruthy()
  })

  it('navigates to the workouts tab', async () => {
    await renderRouter('./app', { initialUrl: '/' })

    await testRouter.push('/workouts')

    expect(await screen.findByRole('header', { name: 'Workouts' })).toBeTruthy()
  })

  it('shows the not-found screen for unknown routes', async () => {
    await renderRouter('./app', { initialUrl: '/missing' })

    expect(await screen.findByText('Page not found')).toBeTruthy()
  })
})
