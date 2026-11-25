import { Link, NavLink, Outlet } from 'react-router'

const year = new Date().getFullYear()

export function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Ynspire, accueil">
          ynspire<span className="brand-star" aria-hidden="true">✦</span>
        </Link>
        <nav className="site-nav" aria-label="Navigation principale">
          <NavLink to="/categories/evenements">Événements</NavLink>
          <NavLink to="/categories/restos-bars-insolites">Restos & bars</NavLink>
          <NavLink to="/categories/points-de-vue">Points de vue</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </nav>
        <Link to="/application" className="pill pill-white">
          <span className="dot dot-pink" aria-hidden="true" /> L’app
        </Link>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-pills">
          <a className="pill pill-lg pill-pink" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <span className="dot dot-white" aria-hidden="true" /> Suivez-nous sur Instagram →
          </a>
          <Link className="pill pill-lg pill-white" to="/application">
            <span className="dot dot-pink" aria-hidden="true" /> Rejoindre la communauté →
          </Link>
          <Link className="pill pill-lg pill-green" to="/blog">
            <span className="dot dot-white" aria-hidden="true" /> Lire le blog →
          </Link>
          <Link className="pill pill-lg pill-blue" to="/categories/evenements">
            <span className="dot dot-white" aria-hidden="true" /> Voir les événements →
          </Link>
        </div>
        <p className="footer-note">© {year} Ynspire · Côte d’Azur</p>
      </footer>
    </div>
  )
}
