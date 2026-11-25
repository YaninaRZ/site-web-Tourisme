import type { CSSProperties } from 'react'
import { Link } from 'react-router'
import { placeIndex, placeSeason, placeTag } from '../data/content'
import type { Place } from '../types'
import { Scene } from './Scene'

// Vignette carrée du feed : image plein cadre, étiquette de date, légende au survol.
export function Tile({ place, order = 0 }: { place: Place; order?: number }) {
  const tag = placeTag(place)
  const style = { animationDelay: `${Math.min(order * 0.05, 0.5)}s` } as CSSProperties

  return (
    <Link className="tile" style={style} to={`/lieux/${place.id}`} aria-label={`${place.title}, ${place.city}`}>
      <Scene season={placeSeason(place)} variant={placeIndex(place) + 1} src={place.imageUrl} />
      {tag && <span className="tag">{tag}</span>}
      <span className="cap">
        <b>{place.title}</b>
        <span>{place.city}</span>
      </span>
    </Link>
  )
}

export function Feed({ items }: { items: Place[] }) {
  if (items.length === 0) return <p className="empty">Rien ici pour l’instant.</p>
  return (
    <div className="feed">
      {items.map((p, i) => (
        <Tile key={p.id} place={p} order={i} />
      ))}
    </div>
  )
}
