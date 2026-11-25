import { Link, useParams } from 'react-router'
import { articles, getArticle } from '../data/content'
import { NotFound } from './NotFound'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function Blog() {
  return (
    <section className="band band-grid">
      <div className="container">
        <header className="page-header">
          <span className="sticker-label sticker-yellow">📝 écrit par l’équipe</span>
          <h1 className="title-xl">le Blog</h1>
          <p>Les articles de l’équipe Ynspire.</p>
        </header>
        <div className="cards">
          {articles.map((a) => (
            <article key={a.slug} className="pick pick-static">
              <p className="mono-label">{dateFormat.format(new Date(a.publishedAt))}</p>
              <h3>{a.title}</h3>
              <p className="pick-text">{a.excerpt}</p>
              <Link to={`/blog/${a.slug}`} className="pill pill-sm pill-yellow">
                Lire l’article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  return (
    <section className="band band-paper">
      <article className="container article">
        <Link to="/blog" className="back-link">← Tous les articles</Link>
        <h1 className="title-xl">{article.title}</h1>
        <p className="mono-label">{dateFormat.format(new Date(article.publishedAt))}</p>
        <p>{article.content}</p>
      </article>
    </section>
  )
}
