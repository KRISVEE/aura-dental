"use client"

import { Star, PlayCircle } from "lucide-react"
import { clinicConfig } from "@/config/clinic"
import Image from "next/image"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 bg-navy text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Featured Video Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
              alt="Patient video testimonial" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1} />
            </div>
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-serif text-2xl mb-1">Meet Rebecca</p>
              <p className="text-gold text-sm font-medium">Full Mouth Reconstruction</p>
            </div>
          </motion.div>

          {/* Text Reviews */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-12">Don&apos;t just take our word for it.</h2>
            <div className="space-y-10">
              {clinicConfig.testimonials.map((t, idx) => (
                <div key={idx} className="relative pl-6 border-l border-white/20 hover:border-gold transition-colors duration-300">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-serif italic text-white/90 mb-4">
                    &quot;{t.text}&quot;
                  </p>
                  <div>
                    <span className="block font-medium">{t.name}</span>
                    <span className="text-sm text-gold">{t.role}</span>
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
