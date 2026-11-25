import type { Place } from '../types'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

function formatDates(place: Place) {
  if (!place.startsAt) return null
  const start = dateFormat.format(new Date(place.startsAt))
  if (!place.endsAt) return start
  return `${start} → ${dateFormat.format(new Date(place.endsAt))}`
}

export function PlaceCard({ place }: { place: Place }) {
  const dates = formatDates(place)
  return (
    <article className="card">
      <div className="card-image" aria-hidden="true" />
      <div className="card-body">
        <p className="card-meta">
          {place.city}
          {dates && <> · {dates}</>}
        </p>
        <h3>{place.title}</h3>
        <p>{place.description}</p>
      </div>
    </article>
  )
}
