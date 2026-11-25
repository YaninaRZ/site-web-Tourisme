export function AppPage() {
  return (
    <section className="band band-grid">
      <div className="container">
        <header className="page-header">
          <span className="sticker-label sticker-blue">📱 dans l’app uniquement</span>
          <h1 className="title-xl">l’app Ynspire</h1>
          <p>Certaines fonctionnalités sont réservées à l’application mobile.</p>
        </header>

        <div className="cards">
          <article className="pick pick-static">
            <p className="pick-cat">🎁 Avantages</p>
            <h3>Des avantages chez nos partenaires</h3>
            <p className="pick-text">Réductions et offres, disponibles uniquement dans l’app.</p>
          </article>
          <article className="pick pick-static">
            <p className="pick-cat">💬 Communauté</p>
            <h3>Un espace réservé aux adhérents</h3>
            <p className="pick-text">
              Partage tes découvertes : chaque publication contient une photo et un commentaire.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
