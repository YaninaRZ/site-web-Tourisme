import { Link, useParams } from 'react-router'
import { PlaceCard, SectionHead } from '../components/Cards'
import { getCategory } from '../data/seed'
import { useContent } from '../data/store-context'
import { downloadIcs, googleCalendarUrl } from '../lib/calendar'
import { mapsUrl, photo, placeDates, publicPlaces } from '../lib/format'
import { NotFound } from './NotFound'

function Access({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className={ok ? 'yes' : 'no'}>
      <span aria-hidden="true">{ok ? '✓' : '—'}</span> {label} : {ok ? 'accessible' : 'non adapté'}
    </li>
  )
}

export function PlacePage() {
  const { id } = useParams()
  const { places } = useContent()
  const visible = publicPlaces(places)
  const place = visible.find((p) => p.id === id)
  const category = getCategory(place?.categorySlug)
  if (!place || !category) return <NotFound />

  const dates = placeDates(place)
  // Même catégorie d'abord, puis le reste
  const related = visible
    .filter((p) => p.id !== place.id)
    .sort((a, b) => Number(b.categorySlug === place.categorySlug) - Number(a.categorySlug === place.categorySlug))
    .slice(0, 4)

  return (
    <>
      <article className="fiche">
        <div className="fiche-media">
          {place.videoUrl ? (
            <video src={place.videoUrl} poster={photo(place.image, 1200)} controls playsInline />
          ) : (
            <img src={photo(place.image, 1200)} alt={place.title} />
          )}
          {place.gallery.length > 0 && (
            <div className="fiche-gallery">
              {place.gallery.map((src) => (
                <img key={src} src={photo(src, 700)} alt="" loading="lazy" />
              ))}
            </div>
          )}
        </div>

        <div className="fiche-info">
          <Link to={`/categories/${category.slug}`} className="back">← {category.name}</Link>
          <span className="kicker">{dates ? `Éphémère · ${category.short}` : category.short}</span>
          <h1>{place.title}</h1>
          <p className="lead">{place.description}</p>

          <dl className="facts">
            <div>
              <dt>Adresse</dt>
              <dd>
                {place.address}
                <br />
                <a href={mapsUrl(place.address)} target="_blank" rel="noreferrer" className="link-u">
                  Voir sur la carte
                </a>
              </dd>
            </div>
            {dates && (
              <div>
                <dt>Dates</dt>
                <dd>{dates}</dd>
              </div>
            )}
            <div>
              <dt>Horaires</dt>
              <dd>{place.hours}</dd>
            </div>
            <div>
              <dt>Tarifs</dt>
              <dd>{place.prices}</dd>
            </div>
            <div>
              <dt>Accessibilité</dt>
              <dd>
                <ul className="access">
                  <Access ok={place.strollerFriendly} label="Poussettes" />
                  <Access ok={place.wheelchairAccessible} label="PMR" />
                </ul>
              </dd>
            </div>
          </dl>

          {dates && (
            <div className="cal">
              <span className="kicker">Ajouter au calendrier</span>
              <div className="cal-actions">
                <button type="button" className="btn" onClick={() => downloadIcs(place)}>
                  Apple ou Android
                </button>
                <a className="btn btn-ghost" href={googleCalendarUrl(place)} target="_blank" rel="noreferrer">
                  Google Agenda
                </a>
              </div>
            </div>
          )}

          {place.tip && (
            <aside className="tip-locked">
              <span className="kicker">Le tip UNSPYR</span>
              <p>Le conseil de l’équipe pour ce lieu est réservé aux membres, dans l’app.</p>
              <Link to="/application" className="link-u">Découvrir l’app</Link>
            </aside>
          )}
        </div>
      </article>

      <section className="section">
        <SectionHead kicker="Pour continuer" title={<>À voir <em>aussi</em></>} />
        <div className="grid-cards">
          {related.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>
    </>
  )
}
