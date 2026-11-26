import { useState } from 'react'
import { Banner, VideoCard } from '../components/Cards'
import { PAGE_IMAGES } from '../data/seed'
import { useContent } from '../data/store-context'

export function Videos() {
  const { videos } = useContent()
  const [profile, setProfile] = useState<string | null>(null)
  const profiles = [...new Set(videos.map((v) => v.profile))]
  const shown = profile ? videos.filter((v) => v.profile === profile) : videos

  return (
    <>
      <Banner
        image={PAGE_IMAGES.videos}
        kicker="Micro-métrages"
        title="Selon votre profil"
        intro="De courts films tournés sur la Côte d’Azur, pour les contemplatifs, les sportifs, les épicuriens et les noctambules."
      />

      <div className="pills" role="group" aria-label="Filtrer par profil">
        <button type="button" className={`pill${profile === null ? ' active' : ''}`} onClick={() => setProfile(null)}>
          Tous
        </button>
        {profiles.map((p) => (
          <button
            key={p}
            type="button"
            className={`pill${profile === p ? ' active' : ''}`}
            aria-pressed={profile === p}
            onClick={() => setProfile(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <section className="section section-tight">
        <div className="video-grid">
          {shown.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </section>
    </>
  )
}
