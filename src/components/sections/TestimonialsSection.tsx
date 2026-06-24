"use client"

import { Star, PlayCircle, Quote } from "lucide-react"
import { clinicConfig } from "@/config/clinic"
import Image from "next/image"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-32 bg-navy text-white relative overflow-hidden">
      {/* Decorative oversized quotes */}
      <div className="absolute top-10 left-10 text-white/[0.03] rotate-12 pointer-events-none">
        <Quote size={400} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Featured Video Player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl"
          >
            <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500 z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
              alt="Patient video testimonial" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
            
            {/* Play Button */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 shadow-luxury">
                <PlayCircle className="w-12 h-12 text-white" strokeWidth={1} />
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-navy/90 to-transparent p-8 pt-20 z-20">
              <p className="font-serif text-3xl mb-2">Meet Rebecca</p>
              <div className="flex items-center gap-3">
                <span className="text-gold text-sm font-medium tracking-wider uppercase">Full Mouth Reconstruction</span>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span className="text-white/80 text-sm">3 min watch</span>
              </div>
            </div>
          </motion.div>

          {/* Text Reviews */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Patient Stories
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-16">
              Don&apos;t just take our word for it.
            </h2>
            
            <div className="space-y-12">
              {clinicConfig.testimonials.map((t, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-white/10 hover:border-gold transition-colors duration-500 group">
                  <div className="absolute -left-[19px] top-0 bg-navy py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Quote className="w-8 h-8 text-gold/30 rotate-180" />
                  </div>
                  <div className="flex gap-1.5 mb-5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl font-serif italic text-white/90 mb-6 leading-relaxed">
                    &quot;{t.text}&quot;
                  </p>
                  <div>
                    <span className="block font-medium text-lg mb-1">{t.name}</span>
                    <span className="text-sm font-medium text-gold uppercase tracking-wider">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
