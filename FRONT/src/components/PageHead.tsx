import type { ReactNode } from 'react'
import { currentSeason, type Season } from '../lib/season'
import { Scene } from './Scene'

// En-tête visuel des pages intérieures : paysage, voile sombre, titre en bas.
export function PageHead({
  title,
  intro,
  season = currentSeason,
  variant = 5,
  children,
}: {
  title: ReactNode
  intro?: ReactNode
  season?: Season
  variant?: number
  children?: ReactNode
}) {
  return (
    <section className="phead">
      <Scene season={season} variant={variant} />
      <div className="veil" />
      <div className="in">
        <div className="shead">
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  )
}
