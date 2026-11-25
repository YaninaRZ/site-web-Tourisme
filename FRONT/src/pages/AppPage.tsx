export function AppPage() {
  return (
    <section className="section">
      <header className="page-header">
        <h1>L’application Ynspire</h1>
        <p>Certaines fonctionnalités sont réservées à l’application mobile.</p>
      </header>

      <div className="cards">
        <article className="card">
          <div className="card-body">
            <h3>Avantages</h3>
            <p>Des avantages chez nos partenaires, disponibles uniquement dans l’app.</p>
          </div>
        </article>
        <article className="card">
          <div className="card-body">
            <h3>Espace communauté</h3>
            <p>
              Un espace réservé aux adhérents pour partager leurs découvertes. Chaque publication
              contient une photo et un commentaire.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
