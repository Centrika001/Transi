import { useState } from 'react'
import { clearAllImages } from '../imageStore.js'
import { ALL_SCREENS } from '../presentationData.js'

const DEFAULTS = {
  ourName: 'Our App',
  competitor1: 'Competitor A',
  competitor2: 'Competitor B',
  competitor3: 'Competitor C',
}

const STORAGE_KEY = 'transi-names'
const SCREENS_KEY = 'transi-disabled-screens'

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

function loadDisabledScreens() {
  try {
    return JSON.parse(localStorage.getItem(SCREENS_KEY)) || []
  } catch {
    return []
  }
}

function saveDisabledScreens(list) {
  localStorage.setItem(SCREENS_KEY, JSON.stringify(list))
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

export function useDisabledScreens() {
  const [disabled, setDisabled] = useState(loadDisabledScreens)

  const updateDisabled = (list) => {
    setDisabled(list)
    saveDisabledScreens(list)
  }

  return [disabled, updateDisabled]
}

export default function SettingsPanel({ names, onUpdateNames, disabledScreens, onUpdateScreens, onClose }) {
  const [draft, setDraft] = useState({ ...names })
  const [draftDisabled, setDraftDisabled] = useState([...disabledScreens])

  const toggleScreen = (file) => {
    setDraftDisabled((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    )
  }

  const handleSave = () => {
    onUpdateNames(draft)
    onUpdateScreens(draftDisabled)
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

        <h2>Screens</h2>

        <div className="screen-toggles">
          {ALL_SCREENS.map((s) => (
            <label key={s.file} className="screen-toggle">
              <input
                type="checkbox"
                checked={!draftDisabled.includes(s.file)}
                onChange={() => toggleScreen(s.file)}
              />
              <span>{s.label}</span>
            </label>
          ))}
        </div>

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
