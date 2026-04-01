import { useState } from 'react'
import { clearAllImages } from '../imageStore.js'
import { ALL_SLIDES } from '../presentationData.js'

const DEFAULTS = {
  ourName: 'Our App',
  competitor1: 'Competitor A',
  competitor2: 'Competitor B',
  competitor3: 'Competitor C',
}

const STORAGE_KEY = 'transi-names'
const SLIDES_KEY = 'transi-disabled-slides'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return { ...DEFAULTS, ...saved }
  } catch {
    return { ...DEFAULTS }
  }
}

function save(names) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names))
}

function loadDisabledSlides() {
  try {
    return JSON.parse(localStorage.getItem(SLIDES_KEY)) || []
  } catch {
    return []
  }
}

function saveDisabledSlides(list) {
  localStorage.setItem(SLIDES_KEY, JSON.stringify(list))
}

export function useNames() {
  const [names, setNames] = useState(load)

  const updateNames = (newNames) => {
    const merged = { ...names, ...newNames }
    setNames(merged)
    save(merged)
  }

  return [names, updateNames]
}

export function useDisabledSlides() {
  const [disabled, setDisabled] = useState(loadDisabledSlides)

  const updateDisabled = (list) => {
    setDisabled(list)
    saveDisabledSlides(list)
  }

  return [disabled, updateDisabled]
}

// Group slides by section
const sections = []
const sectionMap = {}
ALL_SLIDES.forEach((slide) => {
  if (!sectionMap[slide.section]) {
    sectionMap[slide.section] = []
    sections.push(slide.section)
  }
  sectionMap[slide.section].push(slide)
})

export default function SettingsPanel({ names, onUpdateNames, disabledSlides, onUpdateSlides, onClose }) {
  const [draft, setDraft] = useState({ ...names })
  const [draftDisabled, setDraftDisabled] = useState([...disabledSlides])

  const toggleSlide = (id) => {
    setDraftDisabled((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSave = () => {
    onUpdateNames(draft)
    onUpdateSlides(draftDisabled)
    onClose()
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Names</h2>

        <label>
          <span>Our App</span>
          <input
            value={draft.ourName}
            onChange={(e) => setDraft({ ...draft, ourName: e.target.value })}
          />
        </label>

        <label>
          <span>Competitor 1</span>
          <input
            value={draft.competitor1}
            onChange={(e) => setDraft({ ...draft, competitor1: e.target.value })}
          />
        </label>

        <label>
          <span>Competitor 2</span>
          <input
            value={draft.competitor2}
            onChange={(e) => setDraft({ ...draft, competitor2: e.target.value })}
          />
        </label>

        <label>
          <span>Competitor 3</span>
          <input
            value={draft.competitor3}
            onChange={(e) => setDraft({ ...draft, competitor3: e.target.value })}
          />
        </label>

        <h2>Slides</h2>

        {sections.map((section) => (
          <div key={section} className="screen-section">
            <div className="screen-section-title">{section}</div>
            <div className="screen-toggles">
              {sectionMap[section].map((slide) => (
                <label key={slide.id} className="screen-toggle">
                  <input
                    type="checkbox"
                    checked={!draftDisabled.includes(slide.id)}
                    onChange={() => toggleSlide(slide.id)}
                  />
                  <span>{slide.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="settings-actions">
          <button
            className="settings-btn cancel"
            onClick={() => {
              clearAllImages().then(() => window.location.reload())
            }}
          >
            Clear all images
          </button>
          <button className="settings-btn cancel" onClick={onClose}>Cancel</button>
          <button className="settings-btn save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}
