import { Link } from 'react-router'

export function NotFound() {
  return (
    <section className="section page-header">
      <h1>Page introuvable</h1>
      <p>Cette page n’existe pas ou a été déplacée.</p>
      <Link to="/">Retour à l’accueil</Link>
    </section>
  )
}
