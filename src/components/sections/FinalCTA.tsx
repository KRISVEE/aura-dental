"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { motion } from "framer-motion"

export function FinalCTA() {
  return (
    <section className="bg-navy py-32 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/10 mix-blend-screen rounded-l-full blur-[100px] transform translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 mix-blend-screen rounded-r-full blur-[80px] transform -translate-x-1/2 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-8 relative z-10 text-center"
      >
        <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-6">
          Begin Your Journey
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-8 max-w-4xl mx-auto leading-tight">
          Ready to experience premium dental care?
        </h2>
        <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Take the first step towards your new smile. Secure your comprehensive specialist consultation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform h-14 px-10 text-lg shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]" asChild>
            <Link href="/?booking=true">Book Your Consultation</Link>
          </Button>
          <p className="text-white/50 text-sm mt-2 sm:mt-0 font-medium tracking-wide uppercase">
            £50 fully refundable deposit required.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
