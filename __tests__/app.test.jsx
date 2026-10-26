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

describe('Gym Tracker app', () => {
  it('shows the dashboard at the root route', async () => {
    await renderRouter('./app', { initialUrl: '/' })

    expect(await screen.findByRole('header', { name: 'Dashboard' })).toBeTruthy()
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
