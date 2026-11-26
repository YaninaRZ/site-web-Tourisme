import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { categories } from '../data/seed'
import { AppCta } from './AppCta'

const media = [
  { to: '/blog', label: 'Journal' },
  { to: '/videos', label: 'Vidéos' },
  { to: '/application', label: 'L’app' },
]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      {open ? (
        <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" />
      ) : (
        <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" />
      )}
    </svg>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Chaque nouvelle page s'ouvre en haut
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="app">
      <p className="announce">Slow tourism sur la Côte d’Azur · lieux pépites, journal et micro-métrages</p>

      <header className="top">
        <button
          type="button"
          className="icon-btn burger"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuIcon open={menuOpen} />
        </button>

        <nav className="nav nav-left" aria-label="Catégories">
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/categories/${c.slug}`}>{c.short}</NavLink>
          ))}
        </nav>

        <Link to="/" className="logo" onClick={closeMenu}>UNSPYR</Link>

        <div className="nav nav-right">
          <nav aria-label="Le média">
            {media.map((m) => (
              <NavLink key={m.to} to={m.to}>{m.label}</NavLink>
            ))}
          </nav>
          <Link to="/recherche" className="icon-btn" aria-label="Rechercher" onClick={closeMenu}>
            <SearchIcon />
          </Link>
        </div>
      </header>

      {menuOpen && (
        <nav id="menu" className="menu" aria-label="Menu" onClick={closeMenu}>
          <span className="kicker">Catégories</span>
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/categories/${c.slug}`}>{c.name}</NavLink>
          ))}
          <span className="kicker">Le média</span>
          {media.map((m) => (
            <NavLink key={m.to} to={m.to}>{m.label}</NavLink>
          ))}
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      )}

      <main>
        <Outlet />
      </main>

      {!pathname.startsWith('/admin') && <AppCta />}

      <footer className="foot">
        <div className="foot-brand">
          <Link to="/" className="logo">UNSPYR</Link>
          <p>Le média du slow tourism sur la Côte d’Azur.</p>
        </div>
        <nav aria-label="Catégories">
          <span className="kicker">Explorer</span>
          {categories.map((c) => (
            <Link key={c.slug} to={`/categories/${c.slug}`}>{c.name}</Link>
          ))}
        </nav>
        <nav aria-label="Le média">
          <span className="kicker">Le média</span>
          {media.map((m) => (
            <Link key={m.to} to={m.to}>{m.label}</Link>
          ))}
        </nav>
        <nav aria-label="Informations">
          <span className="kicker">Infos</span>
          <Link to="/contact">Contact</Link>
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <Link to="/admin">Espace admin</Link>
        </nav>
        <p className="foot-note">
          © 2026 UNSPYR · Contenus fictifs et photos Unsplash, à remplacer par ceux de l’équipe.
        </p>
      </footer>
    </div>
  )
}
