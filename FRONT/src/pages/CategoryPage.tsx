import { NavLink, useParams } from 'react-router'
import { PlaceCard } from '../components/PlaceCard'
import { categories, getCategory, getPlacesByCategory } from '../data/content'
import { NotFound } from './NotFound'

export function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)

  if (!category) return <NotFound />

  const items = getPlacesByCategory(category.slug)

  return (
    <section className="band band-grid">
      <div className="container">
        <header className="page-header">
          <span className={`sticker-label sticker-${category.color}`}>
            {category.emoji} catégorie
          </span>
          <h1 className="title-xl">{category.name}</h1>
          <p>{category.description}</p>
          <nav className="tabs" aria-label="Catégories">
            {categories.map((c) => (
              <NavLink key={c.slug} to={`/categories/${c.slug}`} className={`tab tab-${c.color}`}>
                {c.emoji} {c.name}
              </NavLink>
            ))}
          </nav>
        </header>

        {items.length === 0 ? (
          <p className="empty">Aucun contenu dans cette catégorie pour le moment.</p>
        ) : (
          <div className="cards">
            {items.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
