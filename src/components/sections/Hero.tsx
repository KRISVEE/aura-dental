"use client";

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { clinicConfig } from "@/config/clinic"
import { Star, Award } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-28 pb-16 overflow-hidden bg-pearl">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/4 w-3/4 h-[500px] bg-gold/5 rounded-full blur-[120px] -z-0 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-5 z-10"
          >
            <div className="inline-flex items-center gap-2 mb-8 bg-white/60 backdrop-blur-sm border border-gold/20 px-4 py-2 rounded-full shadow-sm">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-navy font-semibold uppercase tracking-wider">Over 500+ 5-star reviews</span>
            </div>
            
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-6">
              Private Dentistry in London
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-navy leading-[1.05] tracking-tight mb-8">
              {clinicConfig.tagline}
            </h1>
            <p className="text-lg md:text-xl text-charcoal-500 mb-10 max-w-lg leading-relaxed font-light">
              {clinicConfig.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button size="lg" className="h-14 px-8 text-lg shadow-luxury hover:shadow-lg transition-all hover:-translate-y-0.5" asChild>
                <Link href="/?booking=true">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-charcoal-200 hover:border-gold hover:text-gold hover:bg-transparent transition-all" asChild>
                <Link href="#gallery">View Smile Gallery</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-charcoal-500 font-medium border-t border-charcoal-200/60 pt-6">
              <span className="flex items-center gap-2">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                0% Finance Available
              </span>
              <span className="w-1 h-1 rounded-full bg-charcoal-300" />
              <span>Same-day Emergency</span>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 xl:col-span-7 relative h-[500px] lg:h-[750px] w-full group"
          >
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-navy/10 mix-blend-multiply z-10 transition-colors duration-700 group-hover:bg-transparent" />
              <Image 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2574&auto=format&fit=crop" 
                alt="Confident patient smiling at Aura Dental" 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
            
            {/* Floating Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 glass-panel p-4 md:p-6 rounded-2xl shadow-luxury flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-navy font-serif font-bold text-lg leading-tight">Award Winning</p>
                <p className="text-charcoal-500 text-sm">Private Practice</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
