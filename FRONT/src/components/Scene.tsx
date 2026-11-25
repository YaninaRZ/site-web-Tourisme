import { useId } from 'react'
import { PALETTES, type Season } from '../lib/season'

// Paysage de Riviera en couches (ciel, soleil, collines, mer, voilier),
// recoloré par saison et recadré pour varier les vignettes.
// Sert d'image en attendant les photos : passez `src` pour afficher une vraie photo.

const CROPS = [
  '0 0 1440 900',
  '80 220 680 680',
  '560 200 700 700',
  '0 300 600 600',
  '820 260 620 620',
  '300 120 840 840',
  '1000 300 440 440',
  '140 380 520 520',
]
const SUNS = [1010, 300, 760, 1250, 560, 900, 420, 1150]
const REFLECTIONS: [number, number, number][] = [
  [572, 100, 0.7],
  [588, 140, 0.55],
  [604, 70, 0.5],
  [622, 170, 0.35],
  [642, 50, 0.35],
  [664, 120, 0.2],
]

interface SceneProps {
  season: Season
  /** Indice de recadrage (0 = vue large) */
  variant?: number
  /** Photo réelle : remplace le paysage dessiné */
  src?: string
}

export function Scene({ season, variant = 0, src }: SceneProps) {
  const uid = useId().replace(/:/g, '')

  if (src) return <img className="scene" src={src} alt="" />

  const c = PALETTES[season]
  const viewBox = CROPS[variant % CROPS.length]
  const sunX = variant === 0 ? 1010 : SUNS[variant % SUNS.length]
  const sky = `sky${uid}`
  const sea = `sea${uid}`

  return (
    <svg className="scene" aria-hidden="true" viewBox={viewBox} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.s1} />
          <stop offset="1" stopColor={c.s2} />
        </linearGradient>
        <linearGradient id={sea} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.e1} />
          <stop offset=".45" stopColor={c.e2} />
          <stop offset="1" stopColor={c.e2} />
        </linearGradient>
      </defs>
      <rect width="1440" height="560" fill={`url(#${sky})`} />
      <circle cx={sunX} cy="470" r="86" fill={c.sun} />
      <path
        d="M0 470 C160 430 260 455 380 440 C520 420 600 470 760 462 C900 455 1000 430 1160 448 C1280 462 1360 450 1440 455 L1440 560 L0 560Z"
        fill={c.far}
        opacity=".75"
      />
      <path d="M0 520 C120 470 220 430 330 452 C430 472 470 505 560 512 C650 518 700 540 760 560 L0 560Z" fill={c.mid} />
      <path d="M1440 500 C1340 480 1270 505 1200 520 C1130 535 1080 548 1020 560 L1440 560Z" fill={c.mid} opacity=".85" />
      <path
        d="M0 560 L0 532 C60 520 110 505 160 500 L168 486 L176 486 L178 474 L186 474 L188 486 L200 486 L204 496 L240 494 L244 482 L262 482 L264 492 L300 500 C360 512 420 530 470 560Z"
        fill={c.near}
      />
      <rect y="560" width="1440" height="340" fill={`url(#${sea})`} />
      <g fill={c.sun}>
        {REFLECTIONS.map(([y, w, o]) => (
          <rect key={y} x={sunX - w / 2} y={y} width={w} height="2" opacity={o} />
        ))}
      </g>
      <path d="M1180 600 L1240 600 L1232 610 L1188 610Z M1208 600 L1208 560 L1230 598Z" fill={c.e2} opacity=".85" />
    </svg>
  )
}
