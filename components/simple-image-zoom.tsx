"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ZoomIn } from "lucide-react"

interface SimpleImageZoomProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

export function SimpleImageZoom({ src, alt, className = "", sizes }: SimpleImageZoomProps) {
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    setIsZooming(true)
  }

  const handleMouseLeave = () => {
    setIsZooming(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100))
    
    setMousePosition({ x, y })
    setZoomPosition({ x: xPercent, y: yPercent })
  }

  const handleImageClick = () => {
    // فتح الصورة في تبويب جديد
    window.open(src, '_blank')
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleImageClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-all duration-500 ease-out ${
          isZooming ? "scale-200" : "scale-100"
        }`}
        style={{
          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        }}
        sizes={sizes}
      />
      
      {/* مؤشر التكبير */}
      {isZooming && (
        <div
          className="absolute pointer-events-none border-2 border-white rounded-full w-12 h-12 bg-white/30 backdrop-blur-sm shadow-lg"
          style={{
            left: mousePosition.x - 24,
            top: mousePosition.y - 24,
            transition: "all 0.1s ease-out",
          }}
        />
      )}
      
      {/* أيقونة التكبير */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-300">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
          <ZoomIn className="h-3 w-3" />
          اضغط لفتح الصورة
        </div>
      </div>
    </div>
  )
}
