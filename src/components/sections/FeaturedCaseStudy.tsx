"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { patientResultsConfig } from "@/config/patient-results";
import Link from "next/link";
import { ArrowRight, MoveHorizontal } from "lucide-react";

export function FeaturedCaseStudy() {
  const [position, setPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const featured = patientResultsConfig.caseStudies[0]; // Use the first case study as featured

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const percent = Math.min(Math.max(((clientX - left) / width) * 100, 0), 100);
    setPosition(percent);
  };

  if (!featured) return null;

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-charcoal-200">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Featured Transformation
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-navy">Life-Changing Results</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Interactive Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div 
              ref={containerRef}
              className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-luxury"
              onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
              onTouchMove={handleMove}
            >
              {/* After Image (Background) */}
              <Image src={featured.afterImage} alt="After" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
              
              {/* Before Image (Foreground clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
              >
                <Image src={featured.beforeImage} alt="Before" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover pointer-events-none" draggable={false} />
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize z-20"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gold/30">
                  <MoveHorizontal className="w-5 h-5 text-navy" />
                </div>
              </div>
              
              <div className="absolute top-6 left-6 glass-panel text-navy px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-sm border border-white/40">Before</div>
              <div className="absolute top-6 right-6 glass-panel text-navy px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase z-10 shadow-sm border border-white/40">After</div>
            </div>
          </motion.div>

          {/* Right: Patient Story */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-block bg-navy text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-6">
                {featured.treatmentType} Case Study
              </div>
              <h3 className="text-3xl font-serif text-navy leading-tight mb-4">
                {featured.patientName}&apos;s Story
              </h3>
              <p className="text-xl text-gold font-medium">"{featured.patientGoal}"</p>
            </div>

            <div className="space-y-6">
              {featured.challenge && (
                <div>
                  <h4 className="text-sm font-bold text-charcoal-400 uppercase tracking-widest mb-2">The Challenge</h4>
                  <p className="text-charcoal-600 leading-relaxed">{featured.challenge}</p>
                </div>
              )}
              {featured.solution && (
                <div>
                  <h4 className="text-sm font-bold text-charcoal-400 uppercase tracking-widest mb-2">Our Solution</h4>
                  <p className="text-charcoal-600 leading-relaxed">{featured.solution}</p>
                </div>
              )}
              {featured.result && (
                <div className="bg-pearl p-6 rounded-2xl border border-charcoal-200">
                  <h4 className="text-sm font-bold text-navy uppercase tracking-widest mb-2">The Result</h4>
                  <p className="text-charcoal-800 leading-relaxed font-medium">{featured.result}</p>
                  <p className="text-sm text-charcoal-500 mt-4 font-medium uppercase tracking-wider">Duration: {featured.duration}</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-charcoal-200">
              <Link 
                href="/results"
                className="inline-flex items-center text-navy font-semibold uppercase tracking-wider text-sm hover:text-gold transition-colors duration-300 group"
              >
                View All Case Studies
                <ArrowRight className="w-5 h-5 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
