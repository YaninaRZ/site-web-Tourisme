// Brouillons à valider par l'équipe (et idéalement relus par un juriste).
// Les passages entre crochets sont à compléter.
import { Link } from 'react-router'
import { Banner } from '../components/Cards'
import { PAGE_IMAGES } from '../data/seed'

export function MentionsLegales() {
  return (
    <>
    <Banner
      image={PAGE_IMAGES.legal}
      kicker="Informations"
      title="Mentions légales"
      intro="Brouillon à compléter avant la mise en ligne."
      size="small"
    />
    <section className="section narrow">
      <div className="prose">
        <h2>Éditeur du site</h2>
        <p>
          UNSPYR, [forme juridique], [adresse], [numéro SIRET ou RNA]. Contact :{' '}
          <Link to="/contact">formulaire de contact</Link>.
        </p>
        <h2>Directeur ou directrice de la publication</h2>
        <p>[Nom et prénom]</p>
        <h2>Hébergement</h2>
        <p>
          Site : [hébergeur du front, ex. Vercel ou Netlify, avec son adresse]. Données : Supabase, [région
          d’hébergement, de préférence dans l’Union européenne].
        </p>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, vidéos et photos de l’équipe UNSPYR sont protégés. Les photos d’illustration de la
          version de démonstration proviennent d’Unsplash et sont utilisées selon la licence Unsplash.
        </p>
      </div>
    </section>
    </>
  )
}

export function Confidentialite() {
  return (
    <>
    <Banner
      image={PAGE_IMAGES.privacy}
      kicker="Informations"
      title="Confidentialité"
      intro="Brouillon à valider : il décrit ce que le site collecte aujourd’hui."
      size="small"
    />
    <section className="section narrow">
      <div className="prose">
        <h2>Données collectées</h2>
        <p>
          Le site ne demande de données personnelles que dans le formulaire de contact : nom, adresse e-mail et
          message. Elles servent uniquement à vous répondre et sont supprimées au bout de [durée, ex. 12 mois].
        </p>
        <h2>Cookies</h2>
        <p>
          Le site n’utilise ni cookie publicitaire ni outil de mesure d’audience. Seul l’espace admin garde une
          session de connexion, strictement nécessaire. Aucun bandeau de consentement n’est donc requis. Si un
          outil de statistiques est ajouté, cette page et le bandeau devront être mis à jour.
        </p>
        <h2>Services tiers</h2>
        <p>
          Les polices (Google Fonts) et les photos de démonstration (Unsplash) sont chargées depuis leurs
          serveurs, qui reçoivent votre adresse IP. [À remplacer par des fichiers hébergés par le site avant la
          mise en ligne.]
        </p>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l’accès, la correction ou la suppression de vos données via le{' '}
          <Link to="/contact">formulaire de contact</Link>, et saisir la CNIL en cas de désaccord.
        </p>
      </div>
    </section>
    </>
  )
}
