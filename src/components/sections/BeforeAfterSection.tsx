"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import Image from "next/image"
import { motion } from "framer-motion"
import { patientResultsConfig } from "@/config/patient-results"

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
    <div className="flex flex-col gap-6">
      <div 
        ref={containerRef}
        className="relative h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-luxury bg-white"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <Image src={after} alt="After" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
        
        {/* Before Image (Foreground clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={before} alt="Before" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-20"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gold/30 group transition-transform hover:scale-110">
            <div className="flex gap-1.5">
              <div className="w-0.5 h-4 bg-gold rounded-full" />
              <div className="w-0.5 h-4 bg-gold rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute top-6 left-6 glass-panel text-navy px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-sm border border-white/40">Before</div>
        <div className="absolute top-6 right-6 glass-panel text-navy px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-sm border border-white/40">After</div>
      </div>
      <p className="text-center font-serif text-2xl text-navy">{label}</p>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <section id="gallery" className="py-32 bg-pearl overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Smile Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6 leading-tight">Transformations That Change Lives</h2>
          <p className="text-charcoal-500 text-lg font-light">
            Drag the sliders below to see actual results achieved by our specialist team. Every smile is uniquely designed for the individual.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
        >
          {patientResultsConfig.caseStudies.slice(0, 2).map((study) => (
            <div key={study.id} className="flex flex-col gap-8">
              <SimpleCompareSlider 
                before={study.beforeImage}
                after={study.afterImage}
                label={`${study.treatmentType} Transformation`}
              />
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-charcoal-200">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-widest mb-1">Patient Goal</h4>
                    <p className="text-navy font-medium text-sm leading-relaxed">{study.patientGoal}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-widest mb-1">Treatment</h4>
                    <p className="text-navy font-medium text-sm leading-relaxed">{study.treatmentType}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-widest mb-1">Outcome</h4>
                    <p className="text-navy font-medium text-sm leading-relaxed">{study.treatmentOutcome}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-charcoal-400 uppercase tracking-widest mb-1">Duration</h4>
                    <p className="text-navy font-medium text-sm leading-relaxed">{study.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button size="lg" className="h-14 px-10 text-lg shadow-luxury hover:-translate-y-1 transition-all" onClick={() => window.location.href = '/?booking=true'}>
            Imagine Your New Smile. Book Today.
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
