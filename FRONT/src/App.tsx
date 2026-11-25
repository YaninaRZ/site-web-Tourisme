import './App.css'

const year = new Date().getFullYear()

const destinations = [
  { id: 1, name: 'Destination 1', description: 'Une courte description de la destination.' },
  { id: 2, name: 'Destination 2', description: 'Une courte description de la destination.' },
  { id: 3, name: 'Destination 3', description: 'Une courte description de la destination.' },
]

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <a href="#top" className="brand">Tourisme</a>
        <nav>
          <a href="#destinations">Destinations</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero">
          <h1>Découvrez la ville autrement</h1>
          <p>Une base de site prête à être personnalisée.</p>
          <a href="#destinations" className="btn">Explorer</a>
        </section>

        <section id="destinations" className="section">
          <h2>Destinations</h2>
          <div className="cards">
            {destinations.map((d) => (
              <article key={d.id} className="card">
                <h3>{d.name}</h3>
                <p>{d.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section section-alt">
          <h2>À propos</h2>
          <p>Présentez ici le projet, l'équipe et la mission.</p>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>Ajoutez ici un formulaire ou vos coordonnées.</p>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {year} Tourisme</p>
      </footer>
    </div>
  )
}

export default App
