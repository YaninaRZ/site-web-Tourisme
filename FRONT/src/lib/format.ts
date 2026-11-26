import type { Article, Place } from '../types'

/** Lit une date « AAAA-MM-JJ » en heure locale (sans décalage de fuseau). */
export function parseDay(iso: string) {
  return new Date(iso.length === 10 ? `${iso}T00:00:00` : iso)
}

const monthYear = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })
const dayMonth = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long' })
const full = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export function formatDate(iso: string) {
  return full.format(parseDay(iso))
}

/** Étiquette courte d'un lieu éphémère (« décembre 2026 »), ou null. */
export function placeTag(place: Place) {
  return place.startsAt ? monthYear.format(parseDay(place.startsAt)) : null
}

/** Dates complètes d'un lieu éphémère. */
export function placeDates(place: Place) {
  if (!place.startsAt) return null
  const start = parseDay(place.startsAt)
  if (!place.endsAt || place.endsAt === place.startsAt) return `Le ${full.format(start)}`
  return `Du ${dayMonth.format(start)} au ${full.format(parseDay(place.endsAt))}`
}

/** Lieux affichés sur le site : les lieux « app » restent dans l'application. */
export function publicPlaces(places: Place[]) {
  return places.filter((p) => p.visibility === 'public')
}

export function byNewest(a: Article, b: Article) {
  return b.publishedAt.localeCompare(a.publishedAt)
}

/** Demande à Unsplash une image à la bonne largeur ; les autres URL sont laissées telles quelles. */
export function photo(url: string, width: number) {
  if (!url.includes('images.unsplash.com')) return url
  try {
    const u = new URL(url)
    u.searchParams.set('w', String(width))
    u.searchParams.set('q', '75')
    u.searchParams.set('auto', 'format')
    u.searchParams.set('fit', 'crop')
    return u.toString()
  } catch {
    return url
  }
}

/** Minuscules sans accents, pour la recherche et les slugs. */
export function normalize(text: string) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

export function slugify(text: string) {
  return normalize(text)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Slug libre, en ajoutant -2, -3… si besoin. */
export function uniqueSlug(text: string, taken: string[]) {
  const base = slugify(text) || 'sans-titre'
  let slug = base
  for (let i = 2; taken.includes(slug); i++) slug = `${base}-${i}`
  return slug
}

export function mapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}
