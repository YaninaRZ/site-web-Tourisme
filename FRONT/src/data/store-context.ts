import { createContext, useContext } from 'react'
import type { Article, CommunityPost, ContactMessage, Place, Video } from '../types'

export interface ContentData {
  places: Place[]
  articles: Article[]
  videos: Video[]
  posts: CommunityPost[]
  messages: ContactMessage[]
}

export interface ContentStore extends ContentData {
  savePlace: (place: Place) => void
  deletePlace: (id: string) => void
  /** `previousSlug` permet de renommer l'adresse d'un article existant. */
  saveArticle: (article: Article, previousSlug?: string) => void
  deleteArticle: (slug: string) => void
  saveVideo: (video: Video) => void
  deleteVideo: (id: string) => void
  setPostHidden: (id: string, hidden: boolean) => void
  deletePost: (id: string) => void
  addMessage: (message: Omit<ContactMessage, 'id' | 'createdAt'>) => void
  deleteMessage: (id: string) => void
  reset: () => void
}

export const ContentContext = createContext<ContentStore | null>(null)

/** Accès aux contenus. Aujourd'hui en mémoire, demain via Supabase. */
export function useContent() {
  const store = useContext(ContentContext)
  if (!store) throw new Error('useContent doit être utilisé dans <ContentProvider>')
  return store
}
