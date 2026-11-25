import { PageHead } from '../components/PageHead'

export function AppPage() {
  return (
    <>
      <PageHead
        title={
          <>
            L’app Ynspire, <em>pour aller plus loin</em>
          </>
        }
        intro="Certaines fonctionnalités sont réservées aux adhérents, dans l’application mobile."
        variant={6}
      />
      <section className="block">
        <div className="ctas4">
          <article className="uc uc-static">
            <span className="n">Avantages</span>
            <span className="d">Réductions et offres chez nos partenaires, disponibles uniquement dans l’app.</span>
            <span className="c"><span>Adhérents</span></span>
          </article>
          <article className="uc uc-static">
            <span className="n">Communauté</span>
            <span className="d">
              Un espace pour partager vos découvertes. Chaque publication contient une photo et un
              commentaire.
            </span>
            <span className="c"><span>Adhérents</span></span>
          </article>
          <article className="uc uc-static">
            <span className="n">Carnet</span>
            <span className="d">Gardez les lieux et événements qui vous tentent, pour plus tard.</span>
            <span className="c"><span>Bientôt</span></span>
          </article>
        </div>
      </section>
    </>
  )
}
