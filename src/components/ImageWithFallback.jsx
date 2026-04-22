import { useState, useEffect, useCallback, useRef } from 'react'
import { saveImage, loadImage, deleteImage } from '../imageStore.js'

export default function ImageWithFallback({ src, alt, className, storageKey }) {
  const [objectUrl, setObjectUrl] = useState(null)
  const [fileSrc, setFileSrc] = useState(null)
  const [source, setSource] = useState(null) // 'db' | 'file' | null
  const [loaded, setLoaded] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  // 1. Try IndexedDB (local override), then fall back to static file URL
  useEffect(() => {
    let cancelled = false
    let url = null
    setObjectUrl(null)
    setFileSrc(null)
    setSource(null)
    setLoaded(false)

    loadImage(storageKey).then((blob) => {
      if (cancelled) return
      if (blob) {
        url = URL.createObjectURL(blob)
        setObjectUrl(url)
        setSource('db')
        setLoaded(true)
      } else {
        // Try static file with multiple extensions and alternate names
        const base = src.replace(/\.[^.]+$/, '')
        const ext = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG', '.svg', '.webp']
        const candidates = ext.flatMap((e) => [base + '1' + e, base + e])
        const tryNext = (i) => {
          if (cancelled) return
          if (i >= candidates.length) {
            setLoaded(true)
            return
          }
          fetch(candidates[i], { method: 'HEAD' })
            .then((res) => {
              if (cancelled) return
              if (res.ok) {
                setFileSrc(candidates[i])
                setSource('file')
                setLoaded(true)
              } else {
                tryNext(i + 1)
              }
            })
            .catch(() => tryNext(i + 1))
        }
        tryNext(0)
      }
    })

    return () => {
      cancelled = true
      if (url) URL.revokeObjectURL(url)
    }
  }, [storageKey, src])

  const setImage = useCallback(
    (file) => {
      if (!file || !file.type.startsWith('image/')) return
      saveImage(storageKey, file).then(() => {
        if (objectUrl) URL.revokeObjectURL(objectUrl)
        const url = URL.createObjectURL(file)
        setObjectUrl(url)
        setSource('db')
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
      setSource(null)
    })
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
    e.target.value = ''
  }

  if (!loaded) return null

  const hasImage = source === 'db' || source === 'file'
  const imgSrc = source === 'db' ? objectUrl : fileSrc

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
            draggable={false}
          />
          <div className="img-actions">
            <button className="img-action-btn" onClick={handleClick} title="Replace image">
              &#x270E;
            </button>
            {source === 'db' && (
              <button className="img-action-btn remove" onClick={handleRemove} title="Remove image">
                &times;
              </button>
            )}
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
