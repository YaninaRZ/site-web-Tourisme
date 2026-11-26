import { Link } from 'react-router'
import { Banner } from '../components/Cards'
import { PAGE_IMAGES } from '../data/seed'

export function NotFound() {
  return (
    <Banner
      image={PAGE_IMAGES.notFound}
      kicker="Erreur 404"
      title="Perdue en chemin"
    >
      <Link to="/" className="link-u">Retour à l’accueil</Link>
    </Banner>
  )
}
