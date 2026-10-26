import { StyleSheet } from 'react-native'
import { spacing } from '../constants/theme'
import GlassCard from './GlassCard'

function Panel({ children, style }) {
  return (
    <GlassCard style={[styles.panel, style]} contentStyle={styles.content}>
      {children}
    </GlassCard>
  )
}

const styles = StyleSheet.create({
  panel: {
    alignSelf: 'stretch',
  },
  content: {
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.xl,
  },
})

export default Panel
