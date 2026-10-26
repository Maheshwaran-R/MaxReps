import { Link } from 'expo-router'
import Button from '../components/Button'
import Screen from '../components/Screen'

export default function NotFoundScreen() {
  return (
    <Screen
      eyebrow="404"
      title="Page not found"
      subtitle="The page you are looking for does not exist."
    >
      <Link href="/" asChild>
        <Button label="Back to dashboard" />
      </Link>
    </Screen>
  )
}
