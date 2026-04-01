import { useState, useEffect, useCallback, useRef } from 'react'
import { saveImage, loadImage, deleteImage } from '../imageStore.js'

export default function ImageWithFallback({ src, alt, className, storageKey }) {
  const [objectUrl, setObjectUrl] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  // Load from IndexedDB using storageKey only
  useEffect(() => {
    let cancelled = false
    let url = null
    setObjectUrl(null)
    setLoaded(false)

    loadImage(storageKey).then((blob) => {
      if (cancelled) return
      if (blob) {
        url = URL.createObjectURL(blob)
        setObjectUrl(url)
      }
      setLoaded(true)
    })

    return () => {
      cancelled = true
      if (url) URL.revokeObjectURL(url)
    }
  }, [storageKey])

  const setImage = useCallback(
    (file) => {
      if (!file || !file.type.startsWith('image/')) return
      saveImage(storageKey, file).then(() => {
        if (objectUrl) URL.revokeObjectURL(objectUrl)
        const url = URL.createObjectURL(file)
        setObjectUrl(url)
      })
    },
    [storageKey, objectUrl],
  )

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    setImage(e.dataTransfer.files[0])
  }

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
    deleteImage(storageKey).then(() => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      setObjectUrl(null)
    })
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
    e.target.value = ''
  }

  // Don't render anything until IndexedDB check completes
  if (!loaded) return null

  const hasImage = !!objectUrl

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
            src={objectUrl}
            alt={alt}
            className={className}
            draggable={false}
          />
          <div className="img-actions">
            <button className="img-action-btn" onClick={handleClick} title="Replace image">
              &#x270E;
            </button>
            <button className="img-action-btn remove" onClick={handleRemove} title="Remove image">
              &times;
            </button>
          </div>
        </>
      ) : (
        <div className="image-placeholder" onClick={handleClick}>
          <span className="drop-icon">+</span>
          <span>Drop or tap to add</span>
          <span className="path">{src.split('/').pop()}</span>
        </div>
      )}
      {dragging && (
        <div className="drop-overlay">
          <span>Drop to set image</span>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
