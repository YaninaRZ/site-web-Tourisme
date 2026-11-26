import { useSearchParams } from 'react-router'
import { ArticleCard, PlaceCard, VideoCard } from '../components/Cards'
import { getCategory } from '../data/seed'
import { useContent } from '../data/store-context'
import { normalize, publicPlaces } from '../lib/format'

/** Vrai si chaque mot de la requête apparaît dans l'un des champs. */
function matches(query: string, fields: (string | undefined)[]) {
  const haystack = normalize(fields.filter(Boolean).join(' '))
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

export function Search() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const { places, articles, videos } = useContent()

  const hasQuery = query.trim().length > 0
  const foundPlaces = hasQuery
    ? publicPlaces(places).filter((p) =>
        matches(query, [p.title, p.city, p.description, p.address, getCategory(p.categorySlug)?.name]),
      )
    : publicPlaces(places)
  const foundArticles = hasQuery ? articles.filter((a) => matches(query, [a.title, a.excerpt, a.content])) : []
  const foundVideos = hasQuery ? videos.filter((v) => matches(query, [v.title, v.description, v.profile])) : []
  const total = foundPlaces.length + foundArticles.length + foundVideos.length

  return (
    <section className="section search">
      <form role="search" className="search-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="kicker">Rechercher un lieu, une ville, un article</label>
        <input
          id="q"
          type="search"
          value={query}
          placeholder="Nice, yoga, terrasse…"
          autoFocus
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
        />
      </form>

      {hasQuery && (
        <p className="count" aria-live="polite">
          {total} {total > 1 ? 'résultats' : 'résultat'} pour « {query} »
        </p>
      )}

      {foundPlaces.length > 0 && (
        <div className="search-group">
          <h2>{hasQuery ? 'Lieux' : 'Tous les lieux'}</h2>
          <div className="grid-cards">
            {foundPlaces.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </div>
      )}
      {foundArticles.length > 0 && (
        <div className="search-group">
          <h2>Articles</h2>
          <div className="grid-cards grid-wide">
            {foundArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
      {foundVideos.length > 0 && (
        <div className="search-group">
          <h2>Vidéos</h2>
          <div className="video-grid">
            {foundVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </div>
      )}
      {hasQuery && total === 0 && <p className="empty">Aucun résultat. Essayez un autre mot, ou le nom d’une ville.</p>}
    </section>
  )
}
