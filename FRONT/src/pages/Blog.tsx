import { Link, useParams } from 'react-router'
import { articles, getArticle } from '../data/content'
import { NotFound } from './NotFound'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function Blog() {
  return (
    <section className="section">
      <header className="page-header">
        <h1>Blog</h1>
        <p>Les articles de l’équipe Ynspire.</p>
      </header>
      <ul className="article-list">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link to={`/blog/${a.slug}`}>{a.title}</Link>
            <p className="card-meta">{dateFormat.format(new Date(a.publishedAt))}</p>
            <p>{a.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  return (
    <article className="section article">
      <Link to="/blog">← Tous les articles</Link>
      <h1>{article.title}</h1>
      <p className="card-meta">{dateFormat.format(new Date(article.publishedAt))}</p>
      <p>{article.content}</p>
    </article>
  )
}
