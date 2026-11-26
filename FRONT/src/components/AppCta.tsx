// Bloc d'appel à télécharger l'app, affiché en bas de chaque page.
// Les iPhones sont dessinés en HTML/CSS : nets à toutes les tailles, et les écrans
// reprennent les vraies photos et la typographie du site.
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { PAGE_IMAGES } from '../data/seed'
import { photo } from '../lib/format'

const u = (id: string) => `https://images.unsplash.com/photo-${id}`

const perks = [
  'Les tips de l’équipe pour chaque lieu',
  'Des adresses privées, réservées aux membres',
  'Les avantages chez nos partenaires',
  'La communauté UNSPYR, en photos',
]

const community = [
  { img: u('1643914729809-4aa59fdc4c17'), name: 'Léa', likes: 128 },
  { img: u('1690643211963-eba332f2cc8c'), name: 'Inès', likes: 86 },
  { img: u('1758972573204-e6fbb413bbff'), name: 'Hugo', likes: 203 },
  { img: u('1776083928944-f427c6f1f738'), name: 'Sam', likes: 64 },
]

function StatusBar() {
  return (
    <div className="ph-status" aria-hidden="true">
      <span>9:41</span>
      <span className="ph-icons">
        <i className="ph-signal" />
        <i className="ph-battery" />
      </span>
    </div>
  )
}

function TabBar({ active }: { active: number }) {
  return (
    <nav className="ph-tabs" aria-hidden="true">
      {['Accueil', 'Carte', 'Communauté', 'Profil'].map((label, i) => (
        <span key={label} className={i === active ? 'on' : undefined}>
          <i />
          {label}
        </span>
      ))}
    </nav>
  )
}

/** Écran d'accueil de l'app : lieu à la une et tip réservé aux membres. */
function HomeScreen() {
  return (
    <div className="ph-screen">
      <StatusBar />
      <div className="ph-logo">UNSPYR</div>
      <div className="ph-hero">
        <img src={photo(u('1619447998478-8d09f6a4948b'), 500)} alt="" loading="lazy" />
        <div>
          <span>Safe place</span>
          <strong>La Librairie du Port</strong>
        </div>
      </div>
      <div className="ph-tip">
        <span>Le tip UNSPYR</span>
        <p>Le fauteuil près de la fenêtre du fond est le plus calme de la maison.</p>
      </div>
      <div className="ph-chips">
        <span>Spots</span>
        <span>Wellness</span>
        <span>Clubs</span>
      </div>
      <TabBar active={0} />
    </div>
  )
}

/** Écran communauté : grille de publications des membres. */
function CommunityScreen() {
  return (
    <div className="ph-screen">
      <StatusBar />
      <div className="ph-title">Communauté</div>
      <div className="ph-grid">
        {community.map((c) => (
          <figure key={c.name}>
            <img src={photo(c.img, 300)} alt="" loading="lazy" />
            <figcaption>
              <span>{c.name}</span>
              <span>♥ {c.likes}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <TabBar active={2} />
    </div>
  )
}

function Phone({ children, className }: { children: ReactNode; className: string }) {
  return (
    <div className={`phone ${className}`}>
      <span className="ph-island" />
      {children}
    </div>
  )
}

export function AppCta() {
  return (
    <section className="app-cta" aria-labelledby="app-cta-title">
      <div className="app-cta-text">
        <span className="kicker">L’app UNSPYR · iOS et Android</span>
        <h2 id="app-cta-title" className="lookbook">
          Emportez la Riviera
          <br />
          dans votre poche
        </h2>
        <ul className="app-perks">
          {perks.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="stores">
          <Link to="/application" className="store">
            <small>Bientôt sur</small>
            App Store
          </Link>
          <Link to="/application" className="store">
            <small>Bientôt sur</small>
            Google Play
          </Link>
        </div>
      </div>

      <div className="app-cta-visual" aria-hidden="true">
        <img className="app-cta-bg" src={photo(PAGE_IMAGES.app, 1400)} alt="" loading="lazy" />
        <div className="phones">
          <Phone className="phone-back">
            <CommunityScreen />
          </Phone>
          <Phone className="phone-front">
            <HomeScreen />
          </Phone>
        </div>
      </div>
    </section>
  )
}
