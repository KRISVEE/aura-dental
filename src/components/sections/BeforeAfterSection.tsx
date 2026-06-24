"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"

// Using a simplified static slider for MVP to reduce external dependencies.
// In a full build, this would use react-compare-slider.
function SimpleCompareSlider({ before, after, label }: { before: string, after: string, label: string }) {
  const [position, setPosition] = React.useState(50)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const percent = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100)
    setPosition(percent)
  }

  return (
    <div className="flex flex-col gap-4">
      <div 
        ref={containerRef}
        className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden cursor-ew-resize select-none"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        
        {/* Before Image (Foreground clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-charcoal-500 rounded-full" />
              <div className="w-0.5 h-3 bg-charcoal-500 rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">Before</div>
        <div className="absolute top-4 right-4 bg-navy/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">After</div>
      </div>
      <p className="text-center font-serif text-lg text-navy">{label}</p>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Transformations That Change Lives</h2>
          <p className="text-charcoal-500 text-lg">
            Drag the sliders below to see actual results achieved by our specialist team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <SimpleCompareSlider 
            before="https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=800&auto=format&fit=crop&blur=10"
            after="https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=800&auto=format&fit=crop"
            label="Full Arch Dental Implants"
          />
          <div className="hidden lg:block">
            <SimpleCompareSlider 
              before="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop&blur=10"
              after="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop"
              label="Porcelain Veneers & Whitening"
            />
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" onClick={() => window.location.href = '/?booking=true'}>
            Imagine Your New Smile. Book Today.
          </Button>
        </div>
      </div>
    </section>
  )
}
