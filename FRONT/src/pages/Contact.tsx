import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { useContent } from '../data/store-context'

const empty = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const { addMessage } = useContent()
  const [form, setForm] = useState(empty)
  const [sent, setSent] = useState(false)

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  function submit(e: FormEvent) {
    e.preventDefault()
    addMessage(form)
    setForm(empty)
    setSent(true)
  }

  return (
    <section className="section narrow">
      <header className="page-head">
        <span className="kicker">Contact</span>
        <h1>
          Écrivez-<em>nous</em>
        </h1>
        <p>Une adresse à nous souffler, un partenariat, une question sur l’app : on vous répond sous quelques jours.</p>
      </header>

      {sent ? (
        <div className="notice" role="status">
          <p>Merci, votre message est bien envoyé.</p>
          <button type="button" className="link-u" onClick={() => setSent(false)}>
            Écrire un autre message
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={submit}>
          <div className="form-row">
            <label>
              <span>Nom</span>
              <input required autoComplete="name" value={form.name} onChange={set('name')} />
            </label>
            <label>
              <span>E-mail</span>
              <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} />
            </label>
          </div>
          <label>
            <span>Sujet</span>
            <input value={form.subject} onChange={set('subject')} />
          </label>
          <label>
            <span>Message</span>
            <textarea required rows={7} maxLength={5000} value={form.message} onChange={set('message')} />
          </label>
          <p className="form-note">
            Vos données servent uniquement à vous répondre. Voir la{' '}
            <Link to="/confidentialite">politique de confidentialité</Link>.
          </p>
          <button type="submit" className="btn">Envoyer</button>
        </form>
      )}
    </section>
  )
}
