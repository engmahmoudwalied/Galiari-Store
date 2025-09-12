"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(onComplete, 500) // Wait for fade out animation
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Logo and Title */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-12 w-12 text-rose-400 animate-float" />
            <h1 className="text-4xl font-bold text-rose-400">جاليرى العربى</h1>
          </div>
          <p className="text-lg text-gray-300 animate-fade-in-delay">
            للأفراح والمناسبات الخاصة
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-400 to-rose-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress Text */}
        <div className="animate-fade-in-delay">
          <p className="text-sm text-gray-400 mb-2">جاري التحميل...</p>
          <p className="text-xs text-gray-500">{progress}%</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-rose-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-rose-400/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-rose-400/15 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  )
}
