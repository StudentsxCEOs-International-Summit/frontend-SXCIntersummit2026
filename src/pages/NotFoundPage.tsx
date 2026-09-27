import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-page pt-32">
      <div className="not-found-page__header">
        <span className="not-found-page__brand">SXC Intersummit</span>
        <span className="not-found-page__status">Error 404</span>
      </div>

      <div className="not-found-page__content">
        <div className="not-found-page__visual" aria-hidden="true">
          <span>4</span>
          <span className="not-found-page__visual-zero">0</span>
          <span>4</span>
        </div>
        <div className="not-found-page__copy">
          <p className="not-found-page__eyebrow">Lost in the flow</p>
          <h1>Page not found</h1>
          <p className="not-found-page__message">
            The page you are looking for does not exist or may have moved to a new address.
          </p>
          <Link className="not-found-page__link" to="/">
            Return to homepage
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
