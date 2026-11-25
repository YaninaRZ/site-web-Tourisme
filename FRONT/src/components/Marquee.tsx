// Bandeau de texte qui défile en continu.
// Le contenu est dupliqué pour que la boucle soit sans coupure.
export function Marquee({ text, repeat = 6 }: { text: string; repeat?: number }) {
  const items = Array.from({ length: repeat }, (_, i) => i)
  return (
    <div className="marquee" aria-label={text}>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((half) => (
          <div className="marquee-half" key={half}>
            {items.map((i) => (
              <span key={i}>
                {text} <span className="marquee-icon">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
