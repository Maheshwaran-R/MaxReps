import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, View } from 'react-native'
import { colors, radius } from '../constants/theme'

// Same frosted recipe as the dashboard calendar, but colourless: the rim,
// wash and sheen stay in the dark/neutral range so the lime accent belongs
// to the calendar alone.
const RIM = ['rgba(255, 255, 255, 0.42)', 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.2)']
const FILL = ['rgba(62, 76, 68, 0.5)', 'rgba(28, 36, 32, 0.78)', 'rgba(14, 20, 17, 0.88)']
const FROST = [
  'rgba(255, 255, 255, 0.11)',
  'rgba(255, 255, 255, 0.02)',
  'rgba(255, 255, 255, 0.05)',
]
const SHEEN = ['rgba(255, 255, 255, 0.13)', 'rgba(255, 255, 255, 0.015)', 'rgba(255, 255, 255, 0)']

const RIM_WIDTH = 1.25

function GlassCard({ children, style, contentStyle }) {
  return (
    <View style={[styles.shadow, style]}>
      <LinearGradient
        colors={RIM}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.rim}
      >
        <View style={styles.card}>
          <LinearGradient
            colors={FILL}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          <LinearGradient
            colors={FROST}
            locations={[0, 0.42, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          <LinearGradient
            colors={SHEEN}
            locations={[0, 0.22, 0.55]}
            start={{ x: 0.05, y: 0 }}
            end={{ x: 0.95, y: 1 }}
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          <View style={[styles.content, contentStyle]}>{children}</View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: radius.lg,
    shadowColor: '#000000',
    shadowOpacity: 0.38,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  rim: {
    flexGrow: 1,
    padding: RIM_WIDTH,
    borderRadius: radius.lg + RIM_WIDTH,
  },
  card: {
    flexGrow: 1,
    overflow: 'hidden',
    backgroundColor: colors.glassSurface,
    borderRadius: radius.lg,
  },
  content: {
    flexGrow: 1,
    gap: 6,
  },
})

export default GlassCard
