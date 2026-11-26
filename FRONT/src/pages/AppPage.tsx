import { Banner } from '../components/Cards'

const features = [
  {
    title: 'Les tips de l’équipe',
    text: 'Le bon horaire, la bonne table, le passage secret : nos conseils pour chaque lieu.',
  },
  {
    title: 'Les lieux privés',
    text: 'Des adresses confidentielles, réservées aux membres, en plus de celles du site.',
  },
  {
    title: 'Les avantages',
    text: 'Réductions et attentions chez nos partenaires, disponibles uniquement dans l’app.',
  },
  {
    title: 'La communauté',
    text: 'Partagez vos découvertes en photo et suivez celles des autres membres.',
  },
]

export function AppPage() {
  return (
    <>
      <Banner
        image="https://images.unsplash.com/photo-1693933714044-131908e39427"
        kicker="L’app UNSPYR"
        title={<>Votre compagnon <em>de poche</em></>}
        intro="Sur iOS et Android, l’app emmène UNSPYR avec vous, et réserve quelques secrets à ses membres."
      />
      <section className="section">
        <div className="features">
          {features.map((f) => (
            <article key={f.title}>
              <h2>{f.title}</h2>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
        <p className="empty">Bientôt sur l’App Store et Google Play.</p>
      </section>
    </>
  )
}
