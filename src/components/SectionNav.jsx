export default function SectionNav({ sections, labels, currentIndex, onSelect }) {
  return (
    <nav className="section-nav">
      {sections.map((key, i) => (
        <button
          key={key}
          className={`section-tab ${i === currentIndex ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        >
          {labels[key]}
        </button>
      ))}
    </nav>
  )
}
