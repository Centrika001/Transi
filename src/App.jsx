import { useState, useEffect, useCallback, useMemo } from 'react'
import buildData from './presentationData.js'
import { useNames } from './components/SettingsPanel.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import SectionNav from './components/SectionNav.jsx'
import SlideView from './components/SlideView.jsx'
import CompetitorLogosSection from './components/CompetitorLogosSection.jsx'
import AppComparisonSection from './components/AppComparisonSection.jsx'
import './App.css'

const SECTIONS = ['ourBrand', 'ourApp', 'competitorLogos', 'appComparison']
const SECTION_LABELS = {
  ourBrand: 'Our Brand',
  ourApp: 'Our App',
  competitorLogos: 'Competitor Logos',
  appComparison: 'App Comparison',
}

export default function App() {
  const [sectionIndex, setSectionIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [moderatorMode, setModeratorMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [names, updateNames] = useNames()

  const data = useMemo(() => buildData(names), [names])
  const currentSection = SECTIONS[sectionIndex]

  const getMaxSlide = useCallback(() => {
    switch (currentSection) {
      case 'ourBrand':
        return data.ourBrand.slides.length - 1
      case 'ourApp':
        return data.ourApp.slides.length - 1
      case 'competitorLogos':
        return data.competitorLogos.competitors.length
      case 'appComparison':
        return data.appComparison.screens.length - 1
      default:
        return 0
    }
  }, [currentSection, data])

  const goNext = useCallback(() => {
    if (slideIndex < getMaxSlide()) {
      setSlideIndex(slideIndex + 1)
    } else if (sectionIndex < SECTIONS.length - 1) {
      setSectionIndex(sectionIndex + 1)
      setSlideIndex(0)
    }
  }, [slideIndex, sectionIndex, getMaxSlide])

  const goPrev = useCallback(() => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1)
    } else if (sectionIndex > 0) {
      const prevSection = SECTIONS[sectionIndex - 1]
      setSectionIndex(sectionIndex - 1)
      let lastSlide = 0
      switch (prevSection) {
        case 'ourBrand':
          lastSlide = data.ourBrand.slides.length - 1
          break
        case 'ourApp':
          lastSlide = data.ourApp.slides.length - 1
          break
        case 'competitorLogos':
          lastSlide = data.competitorLogos.competitors.length
          break
        case 'appComparison':
          lastSlide = data.appComparison.screens.length - 1
          break
      }
      setSlideIndex(lastSlide)
    }
  }, [slideIndex, sectionIndex, data])

  const goToSection = useCallback((index) => {
    setSectionIndex(index)
    setSlideIndex(0)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (showSettings) return
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        setModeratorMode((v) => !v)
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault()
        setShowSettings(true)
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev, showSettings])

  // Touch/swipe support
  useEffect(() => {
    let startX = 0
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX
    }
    const handleTouchEnd = (e) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext()
        else goPrev()
      }
    }
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev])

  const renderSection = () => {
    switch (currentSection) {
      case 'ourBrand':
        return (
          <SlideView
            slide={data.ourBrand.slides[slideIndex]}
            index={slideIndex}
            total={data.ourBrand.slides.length}
          />
        )
      case 'ourApp':
        return (
          <SlideView
            slide={data.ourApp.slides[slideIndex]}
            index={slideIndex}
            total={data.ourApp.slides.length}
            isMockup
          />
        )
      case 'competitorLogos':
        return (
          <CompetitorLogosSection
            competitors={data.competitorLogos.competitors}
            slideIndex={slideIndex}
          />
        )
      case 'appComparison':
        return (
          <AppComparisonSection
            screen={data.appComparison.screens[slideIndex]}
            index={slideIndex}
            total={data.appComparison.screens.length}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      {moderatorMode && (
        <SectionNav
          sections={SECTIONS}
          labels={SECTION_LABELS}
          currentIndex={sectionIndex}
          onSelect={goToSection}
        />
      )}

      <div className="slide-container">
        {renderSection()}
      </div>

      {moderatorMode && (
        <div className="controls">
          <button
            className="nav-btn"
            onClick={goPrev}
            disabled={sectionIndex === 0 && slideIndex === 0}
          >
            ← Previous
          </button>
          <button
            className="nav-btn settings-toggle"
            onClick={() => setShowSettings(true)}
          >
            Settings
          </button>
          <span className="slide-counter">
            {SECTION_LABELS[currentSection]} · {slideIndex + 1} / {getMaxSlide() + 1}
          </span>
          <button
            className="nav-btn"
            onClick={goNext}
            disabled={sectionIndex === SECTIONS.length - 1 && slideIndex === getMaxSlide()}
          >
            Next →
          </button>
        </div>
      )}

      {showSettings && (
        <SettingsPanel
          names={names}
          onUpdate={updateNames}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
