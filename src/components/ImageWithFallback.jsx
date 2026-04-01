import { useState, useEffect, useCallback, useRef } from 'react'
import { saveImage, loadImage, deleteImage } from '../imageStore.js'

export default function ImageWithFallback({ src, alt, className, storageKey }) {
  const key = storageKey || src
  const [objectUrl, setObjectUrl] = useState(null)
  const [fileFailed, setFileFailed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    let revoke = null
    loadImage(key).then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        revoke = url
        setObjectUrl(url)
      }
    })
    return () => {
      if (revoke) URL.revokeObjectURL(revoke)
    }
  }, [key])

  const setImage = useCallback(
    (file) => {
      if (!file || !file.type.startsWith('image/')) return
      saveImage(key, file).then(() => {
        if (objectUrl) URL.revokeObjectURL(objectUrl)
        setObjectUrl(URL.createObjectURL(file))
        setFileFailed(false)
      })
    },
    [key, objectUrl],
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
    deleteImage(key).then(() => {
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
          <div className="img-actions">
            <button className="img-action-btn" onClick={handleClick} title="Replace image">
              &#x270E;
            </button>
            {objectUrl && (
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
