import { Fragment, type CSSProperties } from 'react'
import { Link } from 'react-router'
import { Scene } from '../components/Scene'
import { Feed } from '../components/Tile'
import { categories, getPlacesByCategory, places } from '../data/content'
import { currentSeason, TONES } from '../lib/season'

const delay = (s: number) => ({ animationDelay: `${s}s` }) as CSSProperties

export function Home() {
  return (
    <div style={{ background: TONES[currentSeason] }}>
      {/* Entrée plein écran : paysage de la saison en cours */}
      <section className="full">
        <Scene season={currentSeason} />
        <div className="veil" />
        <div className="in">
          <div className="entry">
            <h1>
              La Côte d’Azur, <em>autrement</em>.
            </h1>
            <nav className="choices" aria-label="Choisir une catégorie">
              {categories.map((c, i) => (
                <Fragment key={c.slug}>
                  <Link className="choice" style={delay(0.15 + i * 0.1)} to={`/categories/${c.slug}`}>
                    {c.short}
                  </Link>
                  <span className="sep" aria-hidden="true">·</span>
                </Fragment>
              ))}
              <Link className="choice choice-italic" style={delay(0.5)} to="/blog">
                Le blog
              </Link>
            </nav>
          </div>
        </div>
      </section>

      {/* Les catégories en cartes */}
      <section className="block">
        <h2>Par où commencer ?</h2>
        <nav className="ctas4" aria-label="Catégories">
          {categories.map((c, i) => {
            const n = getPlacesByCategory(c.slug).length
            return (
              <Link key={c.slug} className="uc" style={delay(0.1 + i * 0.12)} to={`/categories/${c.slug}`}>
                <span className="n">{c.short}</span>
                <span className="d">{c.description}</span>
                <span className="c">
                  <span>{n} {n > 1 ? 'adresses' : 'adresse'}</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            )
          })}
        </nav>
      </section>

      <section className="block">
        <h2>À vivre en ce moment</h2>
        <Feed items={places} />
      </section>

      <section className="block">
        <h2>Encore plus dans l’app</h2>
        <nav className="ctas4" aria-label="Fonctionnalités de l’application">
          <Link className="uc" to="/application">
            <span className="n">Avantages</span>
            <span className="d">Des offres chez nos partenaires, réservées à l’app.</span>
            <span className="c"><span>Adhérents</span><span aria-hidden="true">→</span></span>
          </Link>
          <Link className="uc" to="/application">
            <span className="n">Communauté</span>
            <span className="d">Partagez vos découvertes : une photo, un commentaire.</span>
            <span className="c"><span>Adhérents</span><span aria-hidden="true">→</span></span>
          </Link>
        </nav>
      </section>
    </div>
  )
}
