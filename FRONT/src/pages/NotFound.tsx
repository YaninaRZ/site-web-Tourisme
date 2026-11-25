import { Link } from 'react-router'

export function NotFound() {
  return (
    <section className="band band-grid">
      <div className="container page-header center">
        <h1 className="title-xl">oups, perdu ?</h1>
        <p>Cette page n’existe pas ou a été déplacée.</p>
        <Link to="/" className="pill pill-white">
          <span className="dot dot-pink" aria-hidden="true" /> Retour à l’accueil
        </Link>
      </div>
    </section>
  )
}
