// Back-office : ajouter / modifier / supprimer lieux, articles et vidéos, modérer la communauté.
// En démo, tout est enregistré dans ce navigateur. Avec Supabase, l'accès sera réservé au rôle admin (RLS).
import { Link, NavLink, useParams } from 'react-router'
import { getCategory } from '../../data/seed'
import { useContent } from '../../data/store-context'
import { formatDate, photo } from '../../lib/format'
import { NotFound } from '../NotFound'
import { ArticleForm, PlaceForm, VideoForm } from './AdminForms'

const sections = [
  { key: 'lieux', label: 'Lieux' },
  { key: 'articles', label: 'Articles' },
  { key: 'videos', label: 'Vidéos' },
  { key: 'moderation', label: 'Modération' },
  { key: 'messages', label: 'Messages' },
]

/** Nombre de signalements à partir duquel un post est mis en avant pour l'admin. */
const REPORT_ALERT = 3

function confirmDelete(what: string) {
  return window.confirm(`Supprimer « ${what} » ? Cette action est définitive.`)
}

function Head({ title, add }: { title: string; add?: string }) {
  return (
    <div className="admin-head">
      <h1>{title}</h1>
      {add && (
        <Link to={add} className="btn">
          Ajouter
        </Link>
      )}
    </div>
  )
}

function PlacesList() {
  const { places, deletePlace } = useContent()
  return (
    <>
      <Head title="Lieux" add="/admin/lieux/nouveau" />
      <ul className="alist">
        {places.map((p) => (
          <li key={p.id}>
            <img src={photo(p.image, 160)} alt="" />
            <div>
              <strong>{p.title}</strong>
              <span>
                {getCategory(p.categorySlug)?.name} · {p.city}
                {p.visibility === 'app' && <em className="chip">App uniquement</em>}
                {p.startsAt && <em className="chip">Éphémère</em>}
              </span>
            </div>
            <div className="alist-actions">
              {p.visibility === 'public' && <Link to={`/lieux/${p.id}`}>Voir</Link>}
              <Link to={`/admin/lieux/${p.id}`}>Modifier</Link>
              <button type="button" onClick={() => confirmDelete(p.title) && deletePlace(p.id)}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function ArticlesList() {
  const { articles, deleteArticle } = useContent()
  return (
    <>
      <Head title="Articles" add="/admin/articles/nouveau" />
      <ul className="alist">
        {articles.map((a) => (
          <li key={a.slug}>
            <img src={photo(a.cover, 160)} alt="" />
            <div>
              <strong>{a.title}</strong>
              <span>{formatDate(a.publishedAt)}</span>
            </div>
            <div className="alist-actions">
              <Link to={`/blog/${a.slug}`}>Voir</Link>
              <Link to={`/admin/articles/${a.slug}`}>Modifier</Link>
              <button type="button" onClick={() => confirmDelete(a.title) && deleteArticle(a.slug)}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function VideosList() {
  const { videos, deleteVideo } = useContent()
  return (
    <>
      <Head title="Vidéos" add="/admin/videos/nouveau" />
      <ul className="alist">
        {videos.map((v) => (
          <li key={v.id}>
            <img src={photo(v.poster, 160)} alt="" />
            <div>
              <strong>{v.title}</strong>
              <span>
                {v.profile}
                {!v.src && <em className="chip">Sans fichier</em>}
              </span>
            </div>
            <div className="alist-actions">
              <Link to={`/admin/videos/${v.id}`}>Modifier</Link>
              <button type="button" onClick={() => confirmDelete(v.title) && deleteVideo(v.id)}>
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function Moderation() {
  const { posts, setPostHidden, deletePost } = useContent()
  const sorted = [...posts].sort((a, b) => b.reports - a.reports)
  return (
    <>
      <Head title="Modération" />
      <p className="admin-help">
        Publications de la communauté (app), triées par nombre de signalements. Un post masqué n’est plus visible
        des membres mais reste visible de son auteur.
      </p>
      <div className="posts">
        {sorted.map((p) => (
          <article key={p.id} className={`post${p.hidden ? ' is-hidden' : ''}`}>
            <img src={photo(p.photo, 400)} alt="" />
            <div className="post-body">
              <span className="kicker">
                {p.author} · {p.placeTitle} · {formatDate(p.createdAt)}
              </span>
              <p>{p.text}</p>
              <span className={`chip${p.reports >= REPORT_ALERT ? ' chip-alert' : ''}`}>
                {p.reports} signalement{p.reports > 1 ? 's' : ''}
              </span>
              {p.hidden && <span className="chip">Masqué</span>}
              <div className="alist-actions">
                <button type="button" onClick={() => setPostHidden(p.id, !p.hidden)}>
                  {p.hidden ? 'Réafficher' : 'Masquer'}
                </button>
                <button type="button" onClick={() => confirmDelete(p.text) && deletePost(p.id)}>
                  Supprimer
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

function Messages() {
  const { messages, deleteMessage } = useContent()
  return (
    <>
      <Head title="Messages" />
      {messages.length === 0 && <p className="admin-help">Aucun message reçu depuis le formulaire de contact.</p>}
      <ul className="messages">
        {messages.map((m) => (
          <li key={m.id}>
            <span className="kicker">
              {m.name} · {m.email} · {formatDate(m.createdAt)}
            </span>
            {m.subject && <strong>{m.subject}</strong>}
            <p>{m.message}</p>
            <button type="button" className="link-u" onClick={() => confirmDelete(`message de ${m.name}`) && deleteMessage(m.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function Section({ section, id }: { section: string; id?: string }) {
  const { places, articles, videos } = useContent()
  const isNew = id === 'nouveau'

  if (section === 'lieux') {
    if (!id) return <PlacesList />
    const place = places.find((p) => p.id === id)
    return isNew || place ? <PlaceForm key={id} place={place} /> : <NotFound />
  }
  if (section === 'articles') {
    if (!id) return <ArticlesList />
    const article = articles.find((a) => a.slug === id)
    return isNew || article ? <ArticleForm key={id} article={article} /> : <NotFound />
  }
  if (section === 'videos') {
    if (!id) return <VideosList />
    const video = videos.find((v) => v.id === id)
    return isNew || video ? <VideoForm key={id} video={video} /> : <NotFound />
  }
  if (section === 'moderation' && !id) return <Moderation />
  if (section === 'messages' && !id) return <Messages />
  return <NotFound />
}

export function Admin() {
  const { section = 'lieux', id } = useParams()
  const { reset } = useContent()

  return (
    <div className="admin">
      <aside className="admin-nav">
        <span className="kicker">Back-office</span>
        <nav aria-label="Back-office">
          {sections.map((s) => (
            <NavLink key={s.key} to={`/admin/${s.key}`} className={s.key === section ? 'active' : undefined}>
              {s.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="link-u"
          onClick={() => window.confirm('Remettre toutes les données d’exemple ?') && reset()}
        >
          Réinitialiser la démo
        </button>
      </aside>

      <div className="admin-main">
        <p className="admin-banner">
          Mode démo : les modifications sont enregistrées dans ce navigateur uniquement. Une fois Supabase branché,
          cet espace sera réservé aux comptes admin.
        </p>
        <Section section={section} id={id} />
      </div>
    </div>
  )
}
