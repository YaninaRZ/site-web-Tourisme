import { Link } from 'react-router'
import { Banner } from '../components/Cards'
import { PAGE_IMAGES } from '../data/seed'

export function NotFound() {
  return (
    <Banner
      image={PAGE_IMAGES.notFound}
      kicker="Erreur 404"
      title={<>Cette page s’est <em>perdue en chemin</em>.</>}
      size="tall"
    >
      <Link to="/" className="link-u">Retour à l’accueil</Link>
    </Banner>
  )
}
