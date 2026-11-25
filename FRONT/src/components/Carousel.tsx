import { useRef, type ReactNode } from 'react'

// Carrousel horizontal : défilement natif (tactile, molette) + flèches.
export function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scroll(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="carousel-arrows">
        <button type="button" className="arrow" onClick={() => scroll(-1)} aria-label="Précédent">
          ←
        </button>
        <button type="button" className="arrow" onClick={() => scroll(1)} aria-label="Suivant">
          →
        </button>
      </div>
    </div>
  )
}
