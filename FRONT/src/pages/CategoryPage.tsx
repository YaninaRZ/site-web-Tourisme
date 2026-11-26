import { NavLink, useParams } from 'react-router'
import { Banner, PlaceCard } from '../components/Cards'
import { categories, getCategory } from '../data/seed'
import { useContent } from '../data/store-context'
import { publicPlaces } from '../lib/format'
import { NotFound } from './NotFound'

export function CategoryPage() {
  const { slug } = useParams()
  const { places } = useContent()
  const category = getCategory(slug)
  if (!category) return <NotFound />

  const items = publicPlaces(places).filter((p) => p.categorySlug === category.slug)

  return (
    <>
      <Banner image={category.image} kicker="Catalogue" title={category.name} intro={category.description} />

      <nav className="pills" aria-label="Catégories">
        {categories.map((c) => (
          <NavLink key={c.slug} to={`/categories/${c.slug}`} className="pill">
            {c.name}
          </NavLink>
        ))}
      </nav>

      <section className="section section-tight">
        <p className="count">
          {items.length} {items.length > 1 ? 'adresses' : 'adresse'}
        </p>
        {items.length > 0 ? (
          <div className="grid-cards">
            {items.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        ) : (
          <p className="empty">Rien ici pour l’instant.</p>
        )}
      </section>
    </>
  )
}
