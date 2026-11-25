// Données d'exemple en attendant la connexion à Supabase.
// Les titres sont des placeholders : à remplacer par le vrai contenu.
import type { Article, Category, Place } from '../types'

export const categories: Category[] = [
  {
    slug: 'evenements',
    name: 'Événements Côte d’Azur',
    description: 'Marchés de Noël, festivals et rendez-vous à ne pas manquer.',
    color: 'pink',
    emoji: '🎡',
  },
  {
    slug: 'restos-bars-insolites',
    name: 'Restos & bars insolites',
    description: 'Des adresses originales pour manger et boire un verre.',
    color: 'green',
    emoji: '🍹',
  },
  {
    slug: 'points-de-vue',
    name: 'Points de vue',
    description: 'Les plus beaux panoramas de la région.',
    color: 'blue',
    emoji: '🌅',
  },
]

export const places: Place[] = [
  {
    id: 'evt-1',
    categorySlug: 'evenements',
    title: 'Marché de Noël (exemple)',
    description: 'Chalets, artisans et animations pendant les fêtes.',
    city: 'Nice',
    startsAt: '2026-12-01',
    endsAt: '2026-12-31',
  },
  {
    id: 'evt-2',
    categorySlug: 'evenements',
    title: 'Événement d’exemple',
    description: 'Description courte de l’événement.',
    city: 'Cannes',
    startsAt: '2027-02-10',
  },
  {
    id: 'resto-1',
    categorySlug: 'restos-bars-insolites',
    title: 'Restaurant insolite (exemple)',
    description: 'Description courte du lieu.',
    city: 'Antibes',
  },
  {
    id: 'bar-1',
    categorySlug: 'restos-bars-insolites',
    title: 'Bar insolite (exemple)',
    description: 'Description courte du lieu.',
    city: 'Nice',
  },
  {
    id: 'vue-1',
    categorySlug: 'points-de-vue',
    title: 'Point de vue (exemple)',
    description: 'Description courte du panorama.',
    city: 'Èze',
  },
]

export const articles: Article[] = [
  {
    slug: 'premier-article',
    title: 'Premier article (exemple)',
    excerpt: 'Le blog Ynspire est rédigé par l’équipe admin.',
    content:
      'Ceci est un article d’exemple. Les articles seront rédigés par l’admin et stockés dans Supabase.',
    publishedAt: '2026-11-25',
  },
]

export function getCategory(slug: string | undefined) {
  return categories.find((c) => c.slug === slug)
}

export function getPlacesByCategory(slug: string) {
  return places.filter((p) => p.categorySlug === slug)
}

export function getArticle(slug: string | undefined) {
  return articles.find((a) => a.slug === slug)
}
