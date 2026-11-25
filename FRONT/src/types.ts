// Types partagés. Ils suivent le schéma Supabase (BACK/supabase/migrations).

export type CategorySlug = 'evenements' | 'restos-bars-insolites' | 'points-de-vue'

export type AccentColor = 'pink' | 'green' | 'blue' | 'yellow'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  /** Couleur pastel utilisée pour les étiquettes et boutons de la catégorie. */
  color: AccentColor
  emoji: string
}

export interface Place {
  id: string
  categorySlug: CategorySlug
  title: string
  description: string
  city: string
  /** Uniquement pour les événements (format ISO). */
  startsAt?: string
  endsAt?: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
}
