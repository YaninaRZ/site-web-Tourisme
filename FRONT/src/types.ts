// Types partagés. Ils suivent le schéma Supabase (BACK/supabase/migrations).

export type CategorySlug = 'evenements' | 'restos-bars-insolites' | 'points-de-vue'

export interface Category {
  slug: CategorySlug
  name: string
  /** Nom court pour la navigation */
  short: string
  description: string
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
  /** Photo (à venir). Sans photo, un paysage dessiné est affiché. */
  imageUrl?: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
}
