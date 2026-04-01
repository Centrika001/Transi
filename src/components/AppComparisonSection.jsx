import ImageWithFallback from './ImageWithFallback.jsx'

export default function AppComparisonSection({ screen, index, total }) {
  return (
    <div className="app-comparison">
      <div className="slide-label">{screen.label}</div>
      <div className="comparison-grid">
        {screen.apps.map((app, i) => (
          <div
            key={app.name}
            className={`comparison-card ${i === 0 ? 'highlight' : ''}`}
          >
            <ImageWithFallback
              src={app.image}
              alt={`${app.name} — ${screen.label}`}
              storageKey={`app-comparison:${screen.label}:${app.name}`}
            />
            <span className="name">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
