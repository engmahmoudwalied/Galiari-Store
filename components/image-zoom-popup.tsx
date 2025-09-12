"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageZoomPopupProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

export function ImageZoomPopup({ src, alt, className = "", sizes }: ImageZoomPopupProps) {
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showPopup, setShowPopup] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // إغلاق التكبير عند فتح الـ popup
  useEffect(() => {
    if (showPopup) {
      setIsZooming(false)
    }
  }, [showPopup])

  const handleMouseEnter = () => {
    if (!showPopup) {
      setIsZooming(true)
    }
  }

  const handleMouseLeave = () => {
    setIsZooming(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || showPopup) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100))
    
    setMousePosition({ x, y })
    setZoomPosition({ x: xPercent, y: yPercent })
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsZooming(false)
    setShowPopup(true)
  }

  const closePopup = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowPopup(false)
    }
  }

  return (
    <>
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
            isZooming && !showPopup ? "scale-200" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          sizes={sizes}
        />
        
        {/* مؤشر التكبير */}
        {isZooming && !showPopup && (
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
            اضغط للتكبير
          </div>
        </div>
      </div>

      {/* Popup كبير - منفصل تماماً */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closePopup}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            {/* زر الإغلاق */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPopup(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 hover:bg-white/10 rounded-full z-10"
            >
              <X className="h-6 w-6" />
            </Button>
            
            {/* الصورة الكبيرة - بدون أي تأثيرات */}
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* معلومات الصورة */}
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-medium">{alt}</p>
              <p className="text-gray-400 text-sm mt-1">اضغط خارج الصورة للإغلاق</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
