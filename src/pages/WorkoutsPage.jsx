function WorkoutsPage() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Training log</p>
        <h1>Workouts</h1>
        <p className="muted">Log each session and keep an eye on your progress over time.</p>
      </section>

      <section className="panel empty-state">
        <h2>No workouts yet</h2>
        <p className="muted">Sessions you log will be listed here with their exercises and sets.</p>
      </section>
    </>
  )
}

export default WorkoutsPage
