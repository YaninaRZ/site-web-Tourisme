import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Carousel } from '../components/Carousel'
import { Marquee } from '../components/Marquee'
import { articles, getCategory, places } from '../data/content'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

// Prochain événement à mettre en avant (le plus proche dans le temps)
const nextEvent = places
  .filter((p) => p.categorySlug === 'evenements' && p.startsAt)
  .sort((a, b) => (a.startsAt! < b.startsAt! ? -1 : 1))[0]

export function Home() {
  return (
    <>
      <Hero />
      <Marquee text="Bienvenue sur Ynspire · Côte d’Azur" />
      <Recap />
      <Community />
      <Picks />
      <NextEvent />
    </>
  )
}

function Hero() {
  return (
    <section className="hero">
      <span className="sticker-label">pour les curieux, les flâneurs &amp; tous ceux entre les deux</span>
      <h1 className="hero-title">
        inspire-toi,
        <br />
        sors dehors
      </h1>
      <p className="hero-sub">Événements, adresses insolites et points de vue de la Côte d’Azur.</p>
      <Link to="/categories/evenements" className="pill pill-white">
        <span className="dot dot-pink" aria-hidden="true" /> Explorer
      </Link>

      {/* Stickers décoratifs */}
      <span className="float f1" aria-hidden="true">🌴</span>
      <span className="float f2" aria-hidden="true">🍹</span>
      <span className="float f3" aria-hidden="true">📸</span>
      <span className="float f4" aria-hidden="true">⛵</span>
      <span className="float f5" aria-hidden="true">🕶️</span>
      <span className="float f6" aria-hidden="true">🎡</span>
      <span className="star s1" aria-hidden="true">★</span>
      <span className="star s2" aria-hidden="true">★</span>
      <span className="star s3" aria-hidden="true">★</span>
      <span className="star s4" aria-hidden="true">★</span>
    </section>
  )
}

function Recap() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="band band-paper">
      <div className="split">
        <div>
          <h2 className="title-xl">
            le <span className="title-outline">Récap</span>.
          </h2>
          <p className="mono-label">Les bons plans de la semaine, chaque jeudi</p>
        </div>
        <div>
          <p>
            Ce qui se passe sur la Côte d’Azur cette semaine : événements, nouvelles adresses et
            spots à ne pas rater. Juste l’essentiel, sans surcharge.
          </p>
          {sent ? (
            <p className="form-note" role="status">La newsletter arrive bientôt, merci de ton intérêt ✦</p>
          ) : (
            <form className="inline-form" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="recap-email">Adresse e-mail</label>
              <input id="recap-email" type="email" placeholder="ADRESSE E-MAIL" required />
              <button type="submit" className="pill pill-pink">S’inscrire</button>
            </form>
          )}
        </div>
      </div>
      <span className="float f-mail" aria-hidden="true">💌</span>
    </section>
  )
}

function Community() {
  return (
    <section className="band band-grid">
      <div className="split">
        <div>
          <span className="sticker-label sticker-blue">réservé aux adhérents</span>
          <h2 className="title-xl">
            rejoins la
            <br />
            communauté
          </h2>
          <p>
            Dans l’app, les adhérents partagent leurs découvertes : une photo, un commentaire, et
            tout le monde en profite. Plus des avantages chez nos partenaires.
          </p>
          <Link to="/application" className="pill pill-white">
            <span className="dot dot-pink" aria-hidden="true" /> Découvrir l’app
          </Link>
        </div>

        <div className="collage" aria-hidden="true">
          <div className="collage-tile t1">📸</div>
          <div className="collage-tile t2">🌊</div>
          <div className="collage-tile t3">🍝</div>
          <div className="collage-tile t4">🌅</div>
          <div className="collage-tile t5">🎶</div>
          <div className="collage-badge">
            <span className="b-line b-pink">la</span>
            <span className="b-line b-yellow">communauté</span>
            <span className="b-line b-blue">Ynspire</span>
          </div>
          <span className="tag-tilt">photo + commentaire ✦</span>
        </div>
      </div>
    </section>
  )
}

function Picks() {
  return (
    <section className="band band-pink">
      <h2 className="title-lg center">Nos dernières pépites</h2>
      <Carousel label="Nos dernières pépites">
        {places.map((p) => {
          const cat = getCategory(p.categorySlug)!
          return (
            <article key={p.id} className="pick">
              <p className="pick-cat">
                {cat.emoji} {cat.name}
              </p>
              <h3>{p.title}</h3>
              <p className="pick-text">
                {p.city} · {p.description}
              </p>
              <Link to={`/categories/${cat.slug}`} className={`pill pill-sm pill-${cat.color}`}>
                Voir
              </Link>
            </article>
          )
        })}
        {articles.map((a) => (
          <article key={a.slug} className="pick">
            <p className="pick-cat">📝 Blog</p>
            <h3>{a.title}</h3>
            <p className="pick-text">{a.excerpt}</p>
            <Link to={`/blog/${a.slug}`} className="pill pill-sm pill-yellow">
              Lire l’article
            </Link>
          </article>
        ))}
      </Carousel>
    </section>
  )
}

function NextEvent() {
  if (!nextEvent) return null

  return (
    <section className="band band-paper">
      <div className="split">
        <div>
          <p className="kicker">↘ à ne pas manquer</p>
          <h2 className="title-xl">{nextEvent.title}</h2>
          <p className="mono-label">
            {dateFormat.format(new Date(nextEvent.startsAt!))} · {nextEvent.city}
          </p>
          <p>{nextEvent.description}</p>
          <Link to="/categories/evenements" className="pill pill-blue">
            Tous les événements
          </Link>
        </div>

        <div className="polaroids" aria-hidden="true">
          <div className="polaroid p1"><div className="polaroid-img g-pink">🎄</div></div>
          <div className="polaroid p2"><div className="polaroid-img g-blue">✨</div></div>
          <div className="polaroid p3"><div className="polaroid-img g-green">🛍️</div></div>
          <div className="polaroid p4"><div className="polaroid-img g-yellow">🥂</div></div>
          <span className="tag-tilt tag-yellow">on y va ?</span>
        </div>
      </div>
    </section>
  )
}
