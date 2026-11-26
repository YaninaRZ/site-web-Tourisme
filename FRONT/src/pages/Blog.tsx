import { Link, useParams } from 'react-router'
import { ArticleCard, Banner, SectionHead, VideoCard } from '../components/Cards'
import { useContent } from '../data/store-context'
import { byNewest, formatDate } from '../lib/format'
import { NotFound } from './NotFound'

export function Blog() {
  const { articles } = useContent()
  const sorted = [...articles].sort(byNewest)

  return (
    <>
      <Banner
        image={sorted[0]?.cover ?? ''}
        kicker="Le journal"
        title={<>Récits de <em>Riviera</em></>}
        intro="Des articles de fond et des guides pour ralentir, écrits par l’équipe UNSPYR."
      />
      <section className="section">
        {sorted.length > 0 ? (
          <div className="grid-cards grid-wide">
            {sorted.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="empty">Aucun article pour l’instant.</p>
        )}
      </section>
    </>
  )
}

export function ArticlePage() {
  const { slug } = useParams()
  const { articles, videos } = useContent()
  const article = articles.find((a) => a.slug === slug)
  if (!article) return <NotFound />

  const video = videos.find((v) => v.id === article.videoId)
  const more = [...articles].sort(byNewest).filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <article className="article">
        <Banner
          image={article.cover}
          kicker={`Le journal · ${formatDate(article.publishedAt)}`}
          title={article.title}
          intro={article.excerpt}
        />
        <div className="prose">
          <Link to="/blog" className="back">← Le journal</Link>
          {article.content.split(/\n\s*\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        {video && (
          <aside className="article-video">
            <VideoCard video={video} />
          </aside>
        )}
      </article>

      {more.length > 0 && (
        <section className="section">
          <SectionHead kicker="Le journal" title={<>À lire <em>ensuite</em></>} />
          <div className="grid-cards grid-wide">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
