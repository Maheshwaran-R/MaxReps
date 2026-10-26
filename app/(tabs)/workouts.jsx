import { StyleSheet, Text } from 'react-native'
import Panel from '../../components/Panel'
import Screen from '../../components/Screen'
import { colors } from '../../constants/theme'

export default function WorkoutsScreen() {
  return (
    <Screen
      eyebrow="Training log"
      title="Workouts"
      subtitle="Log each session and keep an eye on your progress over time."
    >
      <Panel>
        <Text accessibilityRole="header" style={styles.title}>
          No workouts yet
        </Text>
        <Text style={styles.body}>
          Sessions you log will be listed here with their exercises and sets.
        </Text>
      </Panel>
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
  },
  body: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
  },
})
