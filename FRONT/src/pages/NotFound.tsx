import { Link } from 'react-router'

export function NotFound() {
  return (
    <section className="section narrow lost">
      <span className="kicker">Erreur 404</span>
      <h1>
        Cette page s’est <em>perdue en chemin</em>.
      </h1>
      <Link to="/" className="btn">Retour à l’accueil</Link>
    </section>
  )
}
