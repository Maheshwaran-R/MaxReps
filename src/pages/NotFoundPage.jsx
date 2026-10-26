import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="panel empty-state">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link className="button" to="/">
        Back to dashboard
      </Link>
    </section>
  )
}

export default NotFoundPage
