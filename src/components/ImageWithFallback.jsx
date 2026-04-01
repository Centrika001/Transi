import { useState, useEffect, useCallback } from 'react'
import { saveImage, loadImage, deleteImage } from '../imageStore.js'

export default function ImageWithFallback({ src, alt, className }) {
  const [objectUrl, setObjectUrl] = useState(null)
  const [fileFailed, setFileFailed] = useState(false)
  const [dragging, setDragging] = useState(false)

  // Load from IndexedDB on mount
  useEffect(() => {
    let revoke = null
    loadImage(src).then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        revoke = url
        setObjectUrl(url)
      }
    })
    return () => {
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [src])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDragging(false)

      const file = e.dataTransfer.files[0]
      if (!file || !file.type.startsWith('image/')) return

      saveImage(src, file).then(() => {
        if (objectUrl) URL.revokeObjectURL(objectUrl)
        const url = URL.createObjectURL(file)
        setObjectUrl(url)
        setFileFailed(false)
      })
    },
    [src, objectUrl],
  )

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    deleteImage(src).then(() => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      setObjectUrl(null)
    })
  }

  const hasImage = objectUrl || !fileFailed
  const imgSrc = objectUrl || src

  return (
    <div
      className={`drop-zone ${dragging ? 'drag-over' : ''} ${!hasImage ? 'empty' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {hasImage ? (
        <>
          <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={() => {
              if (!objectUrl) setFileFailed(true)
            }}
            draggable={false}
          />
          {objectUrl && (
            <button className="remove-img-btn" onClick={handleRemove} title="Remove image">
              &times;
            </button>
          )}
        </>
      ) : (
        <div className="image-placeholder">
          <span className="drop-icon">+</span>
          <span>Drop image here</span>
          <span className="path">{src.split('/').pop()}</span>
        </div>
      )}
      {dragging && (
        <div className="drop-overlay">
          <span>Drop to set image</span>
        </div>
      )}
    </div>
  )
}
