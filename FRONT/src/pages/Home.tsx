import { Link } from 'react-router'
import { Banner, PlaceCard, SectionHead } from '../components/Cards'
import { categories, HERO_IMAGE, PAGE_IMAGES } from '../data/seed'
import { useContent } from '../data/store-context'
import { photo, publicPlaces } from '../lib/format'

// Accueil façon Sézane : une suite de bannières pleine largeur,
// entrecoupées de sélections (univers, pépites, feed).
export function Home() {
  const { places } = useContent()
  const visible = publicPlaces(places)

  return (
    <>
      <Banner image={HERO_IMAGE} kicker="Bons baisers" title="de la Côte d’Azur">
        <Link to="/categories/spots" className="link-u">Découvrir les spots</Link>
      </Banner>

      <section className="section">
        <SectionHead kicker="Le catalogue" title={<>Nos <em>univers</em></>} />
        <div className="univers">
          {categories.map((c) => (
            <Link key={c.slug} to={`/categories/${c.slug}`} className="univers-card">
              <div className="card-media">
                <img src={photo(c.image, 700)} alt="" loading="lazy" />
              </div>
              <h3>{c.name}</h3>
              <span className="link-u">Découvrir</span>
            </Link>
          ))}
        </div>
      </section>

      <Banner image={PAGE_IMAGES.journal} kicker="Le journal" title="Récits de Riviera" level={2}>
        <Link to="/blog" className="link-u">Lire le journal</Link>
      </Banner>

      <section className="section">
        <SectionHead
          kicker="Sélection"
          title={<>Les pépites <em>du moment</em></>}
          link={{ to: '/recherche', label: 'Tout explorer' }}
        />
        <div className="rail">
          {visible.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>

      <Banner image={PAGE_IMAGES.videos} kicker="Micro-métrages" title="Selon votre profil" level={2}>
        <Link to="/videos" className="link-u">Voir les vidéos</Link>
      </Banner>

      {/* Feed façon Instagram */}
      <section className="section">
        <SectionHead kicker="Le feed" title={<>Vu <em>par UNSPYR</em></>} />
        <div className="feed">
          {visible.slice(0, 12).map((p) => (
            <Link key={p.id} to={`/lieux/${p.id}`} className="feed-tile">
              <img src={photo(p.image, 500)} alt={p.title} loading="lazy" />
              <span className="feed-cap">
                {p.title}
                <small>{p.city}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
