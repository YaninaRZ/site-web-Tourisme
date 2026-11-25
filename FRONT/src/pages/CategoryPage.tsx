import { useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { PageHead } from '../components/PageHead'
import { Feed } from '../components/Tile'
import { categories, getCategory, getPlacesByCategory } from '../data/content'
import { NotFound } from './NotFound'

type Filter = 'tout' | 'ephemere' | 'permanent'

const FILTERS: [Filter, string][] = [
  ['tout', 'Tout'],
  ['ephemere', 'Éphémère'],
  ['permanent', 'Permanent'],
]

export function CategoryPage() {
  const { slug } = useParams()
  const category = getCategory(slug)

  if (!category) return <NotFound />

  // key : le filtre repart de « Tout » quand on change de catégorie
  return <CategoryContent key={category.slug} slug={category.slug} />
}

function CategoryContent({ slug }: { slug: string }) {
  const category = getCategory(slug)!
  const [filter, setFilter] = useState<Filter>('tout')

  const all = getPlacesByCategory(slug)
  const hasEphemeral = all.some((p) => p.startsAt)
  const items = all.filter((p) =>
    filter === 'ephemere' ? p.startsAt : filter === 'permanent' ? !p.startsAt : true,
  )

  return (
    <>
      <PageHead title={category.name} intro={category.description} variant={categories.indexOf(category) + 2} />

      <div className="fbar">
        <nav className="pills" aria-label="Changer de catégorie">
          {categories.map((c) => (
            <NavLink key={c.slug} className="pill" to={`/categories/${c.slug}`}>
              {c.short}
            </NavLink>
          ))}
        </nav>
        {hasEphemeral && (
          <div className="pills" role="group" aria-label="Filtrer">
            {FILTERS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`pill ${filter === key ? 'on' : ''}`}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <Feed items={items} />
    </>
  )
}
