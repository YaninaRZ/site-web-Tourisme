import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { categories } from '../data/content'

export function Layout() {
  const { pathname } = useLocation()

  // Chaque nouvelle page s'ouvre en haut
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      {/* Barre du haut posée sur le visuel de chaque page */}
      <header className="top">
        <Link to="/" className="logo">UNSPYR</Link>
        <nav className="nav" aria-label="Navigation principale">
          {categories.map((c) => (
            <NavLink key={c.slug} to={`/categories/${c.slug}`}>{c.short}</NavLink>
          ))}
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/application">L’app</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="foot">
        <span className="serif foot-logo">UNSPYR</span>
        <span>La Côte d’Azur, autrement.</span>
        <span>Contenus et visuels d’exemple, à remplacer.</span>
      </footer>
    </div>
  )
}
