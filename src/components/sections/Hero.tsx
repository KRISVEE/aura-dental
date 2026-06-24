"use client";

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { clinicConfig } from "@/config/clinic"
import { Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-pearl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl z-10"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-charcoal-500 font-medium">Over 500+ 5-star reviews</span>
            </div>
            
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-6">
              Private Dentistry in London
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-navy leading-[1.1] mb-6">
              {clinicConfig.tagline}
            </h1>
            <p className="text-lg md:text-xl text-charcoal-500 mb-10 max-w-lg leading-relaxed">
              {clinicConfig.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="h-14 px-8 text-lg hover:scale-105 transition-transform" asChild>
                <Link href="/?booking=true">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
                <Link href="#gallery">View Smile Gallery</Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-charcoal-500 font-medium border-t border-charcoal-200 pt-6">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
            className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl group"
          >
            <div className="absolute inset-0 bg-navy/5 mix-blend-multiply z-10 transition-colors duration-500 group-hover:bg-transparent" />
            <Image 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2574&auto=format&fit=crop" 
              alt="Confident patient smiling at Aura Dental" 
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
