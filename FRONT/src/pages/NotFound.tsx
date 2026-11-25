import { Link } from 'react-router'
import { Scene } from '../components/Scene'
import { currentSeason } from '../lib/season'

export function NotFound() {
  return (
    <section className="full">
      <Scene season={currentSeason} variant={7} />
      <div className="veil" />
      <div className="in">
        <div className="entry">
          <h1>
            Cette page s’est <em>perdue en chemin</em>.
          </h1>
          <Link to="/" className="btn">Retour à l’accueil</Link>
        </div>
      </div>
    </section>
  )
}
