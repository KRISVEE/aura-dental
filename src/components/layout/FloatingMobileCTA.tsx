"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"

export function FloatingMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 z-40 md:hidden bg-gradient-to-t from-white via-white/90 to-transparent pb-6 transition-all duration-300 animate-in slide-in-from-bottom-10">
      <Button 
        size="lg" 
        className="w-full h-14 text-lg shadow-luxury rounded-xl" 
        onClick={() => window.location.href = '/?booking=true'}
      >
        Book Consultation
      </Button>
    </div>
  )
}
