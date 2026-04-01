import ImageWithFallback from './ImageWithFallback.jsx'

export default function CompetitorLogosSection({ competitors, slideIndex }) {
  const isComparison = slideIndex >= competitors.length

  if (isComparison) {
    return (
      <div className="competitor-logos">
        <div className="slide-label">All Competitors — Side by Side</div>
        <div className="logo-comparison">
          {competitors.map((c) => (
            <div className="logo-card" key={c.name}>
              <ImageWithFallback
                src={c.logo}
                alt={c.name}
                storageKey={`competitor-logos:${c.logo}`}
              />
              <span className="name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const competitor = competitors[slideIndex]
  return (
    <div className="competitor-logos">
      <div className="slide-label">{competitor.name}</div>
      <div className="single-logo-wrapper">
        <ImageWithFallback
          src={competitor.logo}
          alt={competitor.name}
          className="single-logo"
          storageKey={`competitor-logos:${competitor.logo}`}
        />
      </div>
    </div>
  )
}
