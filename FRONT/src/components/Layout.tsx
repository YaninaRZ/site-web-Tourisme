import { Link, NavLink, Outlet } from 'react-router'

const year = new Date().getFullYear()

export function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="brand">Ynspire</Link>
        <nav>
          <NavLink to="/categories/evenements">Événements</NavLink>
          <NavLink to="/categories/restos-bars-insolites">Restos & bars</NavLink>
          <NavLink to="/categories/points-de-vue">Points de vue</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/application" className="nav-cta">L’app</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© {year} Ynspire</p>
      </footer>
    </div>
  )
}
