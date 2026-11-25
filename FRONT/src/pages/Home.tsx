import { Link } from 'react-router'
import { articles, categories } from '../data/content'

export function Home() {
  return (
    <>
      <section className="hero">
        <h1>Ynspire</h1>
        <p>Les événements, adresses insolites et points de vue de la Côte d’Azur.</p>
        <Link to="/categories/evenements" className="btn">Explorer</Link>
      </section>

      <section className="section">
        <h2>Catégories</h2>
        <div className="cards">
          {categories.map((c) => (
            <Link key={c.slug} to={`/categories/${c.slug}`} className="card card-link">
              <div className="card-image" aria-hidden="true" />
              <div className="card-body">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-alt">
        <div>
          <h2>Derniers articles</h2>
          <ul className="article-list">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to={`/blog/${a.slug}`}>{a.title}</Link>
                <p>{a.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section app-teaser">
        <h2>Encore plus sur l’application</h2>
        <p>Avantages chez nos partenaires et espace communauté réservés aux adhérents.</p>
        <Link to="/application" className="btn btn-primary">Découvrir l’app</Link>
      </section>
    </>
  )
}
