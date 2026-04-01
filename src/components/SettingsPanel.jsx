import { useState } from 'react'
import { clearAllImages } from '../imageStore.js'

const DEFAULTS = {
  ourName: 'Our App',
  competitor1: 'Competitor A',
  competitor2: 'Competitor B',
  competitor3: 'Competitor C',
}

const STORAGE_KEY = 'transi-names'

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

export function useNames() {
  const [names, setNames] = useState(load)

  const updateNames = (newNames) => {
    const merged = { ...names, ...newNames }
    setNames(merged)
    save(merged)
  }

  return [names, updateNames]
}

export default function SettingsPanel({ names, onUpdate, onClose }) {
  const [draft, setDraft] = useState({ ...names })

  const handleSave = () => {
    onUpdate(draft)
    onClose()
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Names</h2>

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
