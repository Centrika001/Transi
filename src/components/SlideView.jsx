import ImageWithFallback from './ImageWithFallback.jsx'

export default function SlideView({ slide, index, total, isMockup, section }) {
  return (
    <div className="slide-view">
      <div className="slide-label">{slide.label}</div>
      <div className={`slide-image-wrapper ${isMockup ? 'mockup-wrapper' : 'brand'}`}>
        <ImageWithFallback
          src={slide.image}
          alt={slide.label}
          className={`slide-image ${isMockup ? 'mockup' : ''}`}
          storageKey={`${section}:${slide.image}`}
        />
      </div>
    </div>
  )
}
