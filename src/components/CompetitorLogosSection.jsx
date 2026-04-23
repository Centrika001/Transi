import ImageWithFallback from './ImageWithFallback.jsx'

export default function CompetitorLogosSection({ competitors, showCompare, ourLogo, slideIndex }) {
  const isComparison = showCompare && slideIndex >= competitors.length

  if (isComparison) {
    const allLogos = [ourLogo, ...competitors]
    return (
      <div className="competitor-logos">
        <div className="slide-label">All Logos — Side by Side</div>
        <div className="logo-comparison">
          {allLogos.map((c) => (
            <div className={`logo-card ${c === ourLogo ? 'highlight' : ''}`} key={c.name}>
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
