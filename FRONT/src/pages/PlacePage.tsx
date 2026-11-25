import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Scene } from '../components/Scene'
import { Feed } from '../components/Tile'
import {
  getCategory,
  getPlace,
  placeDates,
  placeIndex,
  placeSeason,
  placeTag,
  places,
} from '../data/content'
import type { Place } from '../types'
import { NotFound } from './NotFound'

export function PlacePage() {
  const { id } = useParams()
  const place = getPlace(id)

  if (!place) return <NotFound />

  // key : l'état de la fiche repart de zéro quand on passe à un autre lieu
  return <PlaceContent key={place.id} place={place} />
}

function PlaceContent({ place }: { place: Place }) {
  const [note, setNote] = useState('')

  const category = getCategory(place.categorySlug)!
  const season = placeSeason(place)
  const index = placeIndex(place)
  const tag = placeTag(place)
  const dates = placeDates(place)

  // Même catégorie d'abord, puis le reste
  const more = places
    .filter((p) => p.id !== place.id)
    .sort((a, b) => Number(b.categorySlug === place.categorySlug) - Number(a.categorySlug === place.categorySlug))
    .slice(0, 4)

  return (
    <>
      <section className="dhero">
        <Scene season={season} variant={index + 1} src={place.imageUrl} />
        <div className="veil" />
        <div className="in">
          <div className="dtitle">
            <Link className="back" to={`/categories/${category.slug}`}>← {category.short}</Link>
            <span className={`dtag ${tag ? 'eph' : ''}`}>{tag ? `Éphémère · ${tag}` : 'Permanent'}</span>
            <h1>{place.title}</h1>
            <p className="dsub">
              {category.short} · {place.city}
            </p>
          </div>
        </div>
      </section>

      <div className="dbody">
        <div className="dmain">
          <p className="lead">{place.description}</p>
          <div className="actions">
            <button
              type="button"
              className="btn"
              onClick={() => setNote('Le carnet sera disponible dans l’application.')}
            >
              Ajouter à mon carnet
            </button>
            <p className="note" aria-live="polite">{note}</p>
          </div>
        </div>
        <dl className="facts">
          <dt>Où</dt>
          <dd>{place.city}</dd>
          <dt>Quand</dt>
          <dd>{dates ?? 'Toute l’année'}</dd>
          <dt>Catégorie</dt>
          <dd>{category.name}</dd>
        </dl>
      </div>

      <div className="gal" aria-hidden="true">
        {[2, 4, 6].map((n) => (
          <div key={n}>
            <Scene season={season} variant={index + n} />
          </div>
        ))}
      </div>

      {more.length > 0 && (
        <section className="block">
          <h2>À voir aussi</h2>
          <Feed items={more} />
        </section>
      )}
    </>
  )
}
