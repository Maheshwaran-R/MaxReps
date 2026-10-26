import { Link } from 'react-router-dom'

const stats = [
  { label: 'Workouts this week', value: '0' },
  { label: 'Total volume', value: '0 kg' },
  { label: 'Current streak', value: '0 days' },
]

function DashboardPage() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Overview</p>
        <h1>Dashboard</h1>
        <p className="muted">See your training volume, streaks, and recent sessions at a glance.</p>
      </section>

      <section className="stats-grid" aria-label="Training summary">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="panel">
        <h2>Recent workouts</h2>
        <p className="muted">No workouts logged yet. Your latest sessions will appear here.</p>
        <Link className="button" to="/workouts">
          View workouts
        </Link>
      </section>
    </>
  )
}

export default DashboardPage
