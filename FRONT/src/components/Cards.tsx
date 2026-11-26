import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { getCategory } from '../data/seed'
import { formatDate, photo, placeTag } from '../lib/format'
import type { Article, Place, Video } from '../types'

export function PlaceCard({ place }: { place: Place }) {
  const tag = placeTag(place)
  return (
    <Link to={`/lieux/${place.id}`} className="card">
      <div className="card-media">
        <img src={photo(place.image, 600)} alt="" loading="lazy" />
        {tag && <span className="badge">{tag}</span>}
      </div>
      <span className="kicker">{getCategory(place.categorySlug)?.short}</span>
      <h3>{place.title}</h3>
      <span className="card-sub">{place.city}</span>
    </Link>
  )
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to={`/blog/${article.slug}`} className="card card-wide">
      <div className="card-media">
        <img src={photo(article.cover, 700)} alt="" loading="lazy" />
      </div>
      <span className="kicker">{formatDate(article.publishedAt)}</span>
      <h3>{article.title}</h3>
      <span className="card-sub">{article.excerpt}</span>
    </Link>
  )
}

export function VideoCard({ video }: { video: Video }) {
  return (
    <article className="video-card">
      <div className="video-media">
        {video.src ? (
          <video src={video.src} poster={photo(video.poster, 600)} controls preload="none" playsInline />
        ) : (
          <>
            <img src={photo(video.poster, 600)} alt="" loading="lazy" />
            <span className="play" aria-hidden="true" />
            <span className="badge">Bientôt en ligne</span>
          </>
        )}
      </div>
      <span className="kicker">
        {video.profile}
        {video.duration && ` · ${video.duration}`}
      </span>
      <h3>{video.title}</h3>
      <p className="card-sub">{video.description}</p>
    </article>
  )
}

/** Grand bandeau photo des pages intérieures. */
export function Banner({
  image,
  kicker,
  title,
  intro,
  size = 'normal',
  children,
}: {
  image: string
  kicker: string
  title: ReactNode
  intro?: string
  /** small : pages utilitaires · tall : article, 404 */
  size?: 'small' | 'normal' | 'tall'
  children?: ReactNode
}) {
  return (
    <header className={`banner banner-${size}`}>
      {image && <img src={photo(image, 1800)} alt="" />}
      <div className="banner-text">
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {children}
      </div>
    </header>
  )
}

export function SectionHead({ kicker, title, link }: { kicker: string; title: ReactNode; link?: { to: string; label: string } }) {
  return (
    <div className="section-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {link && (
        <Link to={link.to} className="link-u">
          {link.label}
        </Link>
      )}
    </div>
  )
}
