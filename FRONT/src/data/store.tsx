// Store de démonstration : les contenus vivent en mémoire et sont gardés dans
// le navigateur (localStorage) pour que le back-office soit utilisable avant
// la connexion à Supabase. Voir docs/adr/0010-back-office-et-store-demo.md.
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ContentContext, type ContentData, type ContentStore } from './store-context'
import { initialArticles, initialPlaces, initialPosts, initialVideos } from './seed'

const KEY = 'unspyr-demo-v1'

const initialData: ContentData = {
  places: initialPlaces,
  articles: initialArticles,
  videos: initialVideos,
  posts: initialPosts,
  messages: [],
}

function load(): ContentData {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...initialData, ...(JSON.parse(raw) as Partial<ContentData>) }
  } catch {
    // Stockage indisponible ou données illisibles : on repart des données d'exemple.
  }
  return initialData
}

/** Remplace l'élément de même clé, ou l'ajoute en tête de liste. */
function upsert<T>(list: T[], item: T, same: (a: T) => boolean) {
  return list.some(same) ? list.map((x) => (same(x) ? item : x)) : [item, ...list]
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ContentData>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      // Navigation privée ou stockage plein : les modifications restent en mémoire.
    }
  }, [data])

  const store = useMemo<ContentStore>(() => {
    const patch = (fn: (d: ContentData) => Partial<ContentData>) =>
      setData((d) => ({ ...d, ...fn(d) }))

    return {
      ...data,
      savePlace: (place) =>
        patch((d) => ({ places: upsert(d.places, place, (p) => p.id === place.id) })),
      deletePlace: (id) => patch((d) => ({ places: d.places.filter((p) => p.id !== id) })),
      saveArticle: (article, previousSlug = article.slug) =>
        patch((d) => ({ articles: upsert(d.articles, article, (a) => a.slug === previousSlug) })),
      deleteArticle: (slug) =>
        patch((d) => ({ articles: d.articles.filter((a) => a.slug !== slug) })),
      saveVideo: (video) =>
        patch((d) => ({ videos: upsert(d.videos, video, (v) => v.id === video.id) })),
      deleteVideo: (id) =>
        patch((d) => ({
          videos: d.videos.filter((v) => v.id !== id),
          articles: d.articles.map((a) => (a.videoId === id ? { ...a, videoId: undefined } : a)),
        })),
      setPostHidden: (id, hidden) =>
        patch((d) => ({ posts: d.posts.map((p) => (p.id === id ? { ...p, hidden } : p)) })),
      deletePost: (id) => patch((d) => ({ posts: d.posts.filter((p) => p.id !== id) })),
      addMessage: (message) =>
        patch((d) => ({
          messages: [
            { ...message, id: Date.now().toString(36), createdAt: new Date().toISOString() },
            ...d.messages,
          ],
        })),
      deleteMessage: (id) => patch((d) => ({ messages: d.messages.filter((m) => m.id !== id) })),
      reset: () => setData(initialData),
    }
  }, [data])

  return <ContentContext value={store}>{children}</ContentContext>
}
