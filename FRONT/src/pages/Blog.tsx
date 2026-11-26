import { Link, useParams } from 'react-router'
import { PageHead } from '../components/PageHead'
import { articles, formatDate, getArticle } from '../data/content'
import { NotFound } from './NotFound'

export function Blog() {
  return (
    <>
      <PageHead
        title={
          <>
            Le blog, <em>au fil des saisons</em>
          </>
        }
        intro="Les articles de l’équipe UNSPYR."
        variant={1}
      />
      <section className="block">
        <ul className="alist">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link to={`/blog/${a.slug}`}>
                <span className="alist-date">{formatDate(a.publishedAt)}</span>
                <span className="alist-title serif">{a.title}</span>
                <span className="alist-excerpt">{a.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  return (
    <>
      <PageHead title={article.title} intro={formatDate(article.publishedAt)} variant={3}>
        <Link className="back" to="/blog">← Tous les articles</Link>
      </PageHead>
      <article className="prose">
        <p className="lead">{article.excerpt}</p>
        <p>{article.content}</p>
      </article>
    </>
  )
}
