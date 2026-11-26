import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router'
import { categories } from '../../data/seed'
import { useContent } from '../../data/store-context'
import { photo, slugify, uniqueSlug } from '../../lib/format'
import type { Article, CategorySlug, Place, Video, Visibility } from '../../types'

type Change = { target: { value: string } }

/** État de formulaire avec un setter par champ. */
function useForm<T extends object>(initial: T) {
  const [form, setForm] = useState(initial)
  const set = <K extends keyof T>(key: K, value: T[K]) => setForm((f) => ({ ...f, [key]: value }))
  const bind = (key: { [K in keyof T]: T[K] extends string ? K : never }[keyof T]) => ({
    value: form[key] as string,
    onChange: (e: Change) => set(key, e.target.value as T[typeof key]),
  })
  return { form, set, bind }
}

function Field({ label, hint, children, wide }: { label: string; hint?: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={wide ? 'wide' : undefined}>
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  )
}

function FormShell({ title, back, onSubmit, preview, children }: {
  title: string
  back: string
  onSubmit: (e: FormEvent) => void
  preview?: string
  children: ReactNode
}) {
  return (
    <form className="aform" onSubmit={onSubmit}>
      <div className="admin-head">
        <h1>{title}</h1>
        <Link to={back} className="link-u">Annuler</Link>
      </div>
      {preview && <img className="aform-preview" src={photo(preview, 600)} alt="Aperçu" />}
      <div className="aform-grid">{children}</div>
      <button type="submit" className="btn">Enregistrer</button>
    </form>
  )
}

const today = new Date().toISOString().slice(0, 10)

const lines = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean)

// ---------------------------------------------------------------------------

export function PlaceForm({ place }: { place?: Place }) {
  const { places, savePlace } = useContent()
  const navigate = useNavigate()
  const { form, set, bind } = useForm({
    title: place?.title ?? '',
    categorySlug: place?.categorySlug ?? ('spots' as CategorySlug),
    city: place?.city ?? '',
    address: place?.address ?? '',
    hours: place?.hours ?? '',
    prices: place?.prices ?? '',
    description: place?.description ?? '',
    image: place?.image ?? '',
    gallery: place?.gallery.join('\n') ?? '',
    videoUrl: place?.videoUrl ?? '',
    startsAt: place?.startsAt ?? '',
    endsAt: place?.endsAt ?? '',
    strollerFriendly: place?.strollerFriendly ?? false,
    wheelchairAccessible: place?.wheelchairAccessible ?? false,
    tip: place?.tip ?? '',
    visibility: place?.visibility ?? ('public' as Visibility),
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    savePlace({
      ...form,
      id: place?.id ?? uniqueSlug(form.title, places.map((p) => p.id)),
      gallery: lines(form.gallery),
      videoUrl: form.videoUrl || undefined,
      startsAt: form.startsAt || undefined,
      endsAt: (form.startsAt && form.endsAt) || undefined,
      tip: form.tip || undefined,
    })
    navigate('/admin/lieux')
  }

  return (
    <FormShell title={place ? 'Modifier le lieu' : 'Nouveau lieu'} back="/admin/lieux" onSubmit={submit} preview={form.image}>
      <Field label="Titre">
        <input required {...bind('title')} />
      </Field>
      <Field label="Catégorie">
        <select value={form.categorySlug} onChange={(e) => set('categorySlug', e.target.value as CategorySlug)}>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Ville">
        <input required {...bind('city')} />
      </Field>
      <Field label="Adresse">
        <input required {...bind('address')} />
      </Field>
      <Field label="Horaires">
        <input required {...bind('hours')} />
      </Field>
      <Field label="Tarifs">
        <input required {...bind('prices')} />
      </Field>
      <Field label="Description" wide>
        <textarea required rows={4} {...bind('description')} />
      </Field>
      <Field label="Photo principale (URL)" hint="Avec Supabase : envoi du fichier dans le bucket « media ».">
        <input required type="url" {...bind('image')} />
      </Field>
      <Field label="Vidéo (URL, facultatif)" hint="Remplace la photo principale sur la fiche.">
        <input type="url" {...bind('videoUrl')} />
      </Field>
      <Field label="Galerie (une URL par ligne)" wide>
        <textarea rows={3} {...bind('gallery')} />
      </Field>
      <Field label="Début (lieu éphémère)" hint="Laisser vide pour un lieu permanent.">
        <input type="date" {...bind('startsAt')} />
      </Field>
      <Field label="Fin">
        <input type="date" min={form.startsAt || undefined} disabled={!form.startsAt} {...bind('endsAt')} />
      </Field>
      <fieldset className="checks">
        <legend>Accessibilité</legend>
        <label>
          <input type="checkbox" checked={form.strollerFriendly} onChange={(e) => set('strollerFriendly', e.target.checked)} />
          Poussettes
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.wheelchairAccessible}
            onChange={(e) => set('wheelchairAccessible', e.target.checked)}
          />
          PMR
        </label>
      </fieldset>
      <Field label="Visibilité">
        <select value={form.visibility} onChange={(e) => set('visibility', e.target.value as Visibility)}>
          <option value="public">Site et app</option>
          <option value="app">App uniquement (lieu privé)</option>
        </select>
      </Field>
      <Field label="Tip de l’équipe" hint="Affiché uniquement dans l’app, jamais sur le site." wide>
        <textarea rows={2} {...bind('tip')} />
      </Field>
    </FormShell>
  )
}

// ---------------------------------------------------------------------------

export function ArticleForm({ article }: { article?: Article }) {
  const { articles, videos, saveArticle } = useContent()
  const navigate = useNavigate()
  const { form, set, bind } = useForm({
    title: article?.title ?? '',
    slug: article?.slug ?? '',
    excerpt: article?.excerpt ?? '',
    cover: article?.cover ?? '',
    publishedAt: article?.publishedAt ?? today,
    videoId: article?.videoId ?? '',
    content: article?.content ?? '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    const others = articles.filter((a) => a.slug !== article?.slug).map((a) => a.slug)
    saveArticle(
      { ...form, slug: uniqueSlug(form.slug || form.title, others), videoId: form.videoId || undefined },
      article?.slug,
    )
    navigate('/admin/articles')
  }

  return (
    <FormShell title={article ? 'Modifier l’article' : 'Nouvel article'} back="/admin/articles" onSubmit={submit} preview={form.cover}>
      <Field label="Titre" wide>
        <input required {...bind('title')} />
      </Field>
      <Field label="Adresse de la page" hint={`/blog/${slugify(form.slug || form.title) || '…'}`}>
        <input {...bind('slug')} placeholder="Générée depuis le titre" />
      </Field>
      <Field label="Date de publication">
        <input required type="date" {...bind('publishedAt')} />
      </Field>
      <Field label="Chapô" wide>
        <textarea required rows={2} {...bind('excerpt')} />
      </Field>
      <Field label="Photo de couverture (URL)">
        <input required type="url" {...bind('cover')} />
      </Field>
      <Field label="Vidéo liée">
        <select value={form.videoId} onChange={(e) => set('videoId', e.target.value)}>
          <option value="">Aucune</option>
          {videos.map((v) => (
            <option key={v.id} value={v.id}>{v.title}</option>
          ))}
        </select>
      </Field>
      <Field label="Texte" hint="Une ligne vide entre deux paragraphes." wide>
        <textarea required rows={12} {...bind('content')} />
      </Field>
    </FormShell>
  )
}

// ---------------------------------------------------------------------------

export function VideoForm({ video }: { video?: Video }) {
  const { videos, saveVideo } = useContent()
  const navigate = useNavigate()
  const profiles = [...new Set(videos.map((v) => v.profile))]
  const { form, bind } = useForm({
    title: video?.title ?? '',
    profile: video?.profile ?? '',
    description: video?.description ?? '',
    poster: video?.poster ?? '',
    src: video?.src ?? '',
    duration: video?.duration ?? '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    saveVideo({
      ...form,
      id: video?.id ?? uniqueSlug(form.title, videos.map((v) => v.id)),
      src: form.src || undefined,
      duration: form.duration || undefined,
    })
    navigate('/admin/videos')
  }

  return (
    <FormShell title={video ? 'Modifier la vidéo' : 'Nouvelle vidéo'} back="/admin/videos" onSubmit={submit} preview={form.poster}>
      <Field label="Titre">
        <input required {...bind('title')} />
      </Field>
      <Field label="Profil" hint="Ex. Contemplatif, Sportif, Épicurien, Noctambule.">
        <input required list="profiles" {...bind('profile')} />
        <datalist id="profiles">
          {profiles.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      </Field>
      <Field label="Description" wide>
        <textarea required rows={3} {...bind('description')} />
      </Field>
      <Field label="Image d’aperçu (URL)">
        <input required type="url" {...bind('poster')} />
      </Field>
      <Field label="Fichier vidéo (URL MP4)" hint="Avec Supabase : envoi dans le bucket « media » (50 Mo max).">
        <input type="url" {...bind('src')} />
      </Field>
      <Field label="Durée">
        <input {...bind('duration')} placeholder="1 min 20" />
      </Field>
    </FormShell>
  )
}
