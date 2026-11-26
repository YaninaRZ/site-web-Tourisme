// Types partagés. Ils suivent le schéma Supabase (BACK/supabase/migrations).

export type CategorySlug = 'sport-wellness' | 'spots' | 'safe-place' | 'clubs-restaurants'

export interface Category {
  slug: CategorySlug
  name: string
  /** Nom court pour la navigation */
  short: string
  description: string
  image: string
}

/** « app » : lieu privé, affiché uniquement dans l'application. */
export type Visibility = 'public' | 'app'

export interface Place {
  id: string
  categorySlug: CategorySlug
  title: string
  description: string
  city: string
  address: string
  hours: string
  prices: string
  /** Photo principale */
  image: string
  gallery: string[]
  /** Vidéo affichée à la place de la photo principale */
  videoUrl?: string
  /** Uniquement pour les lieux éphémères (format AAAA-MM-JJ). */
  startsAt?: string
  endsAt?: string
  strollerFriendly: boolean
  wheelchairAccessible: boolean
  /** Conseil de l'équipe : jamais affiché sur le site, réservé à l'app. */
  tip?: string
  visibility: Visibility
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  /** Paragraphes séparés par une ligne vide */
  content: string
  cover: string
  publishedAt: string
  videoId?: string
}

export interface Video {
  id: string
  title: string
  description: string
  /** Profil visé : Contemplatif, Sportif, Épicurien, Noctambule… */
  profile: string
  poster: string
  /** Sans fichier, la vidéo est annoncée « bientôt en ligne ». */
  src?: string
  duration?: string
}

/** Publication de la communauté (app), modérée depuis le back-office. */
export interface CommunityPost {
  id: string
  author: string
  placeTitle: string
  photo: string
  text: string
  reports: number
  hidden: boolean
  createdAt: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}
