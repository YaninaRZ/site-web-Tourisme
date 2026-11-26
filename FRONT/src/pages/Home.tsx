import { Link } from 'react-router'
import { ArticleCard, PlaceCard, SectionHead, VideoCard } from '../components/Cards'
import { categories, HERO_IMAGE } from '../data/seed'
import { useContent } from '../data/store-context'
import { byNewest, formatDate, photo, publicPlaces } from '../lib/format'

export function Home() {
  const { places, articles, videos } = useContent()
  const visible = publicPlaces(places)
  const [featured, ...others] = [...articles].sort(byNewest)

  return (
    <>
      {/* Bannière divisée : feed façon Instagram (3 × 4) et carte postale */}
      <section className="hero">
        <div className="feed" aria-label="Le feed UNSPYR">
          {visible.slice(0, 12).map((p) => (
            <Link key={p.id} to={`/lieux/${p.id}`} className="feed-tile">
              <img src={photo(p.image, 400)} alt={p.title} />
              <span className="feed-cap">
                {p.title}
                <small>{p.city}</small>
              </span>
            </Link>
          ))}
        </div>

        <div className="postcard">
          <img src={photo(HERO_IMAGE, 1600)} alt="Villefranche-sur-Mer au coucher du soleil" />
          <div className="postcard-text">
            <p className="lookbook">Bons baisers</p>
            <h1 className="lookbook">de la Côte d’Azur</h1>
            <Link to="/categories/spots" className="link-u">Découvrir les spots</Link>
          </div>
        </div>
      </section>

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

      {featured && (
        <section className="section feature">
          <Link to={`/blog/${featured.slug}`} className="feature-media">
            <img src={photo(featured.cover, 1200)} alt="" loading="lazy" />
          </Link>
          <div className="feature-text">
            <span className="kicker">Le journal · {formatDate(featured.publishedAt)}</span>
            <h2>
              <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
            </h2>
            <p>{featured.excerpt}</p>
            <Link to={`/blog/${featured.slug}`} className="link-u">Lire l’article</Link>
            <div className="feature-more">
              {others.slice(0, 2).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section-sand">
        <SectionHead
          kicker="Micro-métrages"
          title={<>La Riviera <em>selon votre profil</em></>}
          link={{ to: '/videos', label: 'Toutes les vidéos' }}
        />
        <div className="video-grid">
          {videos.slice(0, 4).map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>
    </>
  )
}
