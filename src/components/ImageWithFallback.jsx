import { useState } from 'react'

export default function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="image-placeholder">
        <span>Image not found</span>
        <span className="path">{src}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      draggable={false}
    />
  )
}
