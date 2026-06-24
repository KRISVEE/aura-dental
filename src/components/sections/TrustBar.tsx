"use client";

import { Star, Clock } from "lucide-react"
import { motion } from "framer-motion"

export function TrustBar() {
  return (
    <section className="bg-white border-y border-charcoal-200/50 py-10 relative z-20 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col xl:flex-row items-center justify-between gap-10 overflow-x-auto no-scrollbar"
        >
          
          {/* Google Reviews */}
          <div className="flex items-center gap-4 shrink-0 group cursor-pointer p-4 rounded-xl hover:bg-charcoal-50 transition-colors">
            <div className="flex gap-1 transition-transform group-hover:scale-105">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-gold text-gold" />
              ))}
            </div>
            <div className="text-sm font-medium text-navy">
              <span className="block text-base group-hover:text-gold transition-colors">4.9/5 from 500+ Reviews</span>
              <span className="text-charcoal-500 text-xs">Verified Google Patients</span>
            </div>
          </div>

          {/* Urgency Indicator */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 bg-red-50/80 text-red-700 px-5 py-2.5 rounded-full border border-red-100/50 shadow-sm">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </div>
            <span className="text-sm font-medium">Only 2 consultation slots left this week</span>
          </div>

          {/* Compliance & Accreditations (High-Fidelity Replicas) */}
          <div className="flex items-center gap-8 md:gap-12 shrink-0 opacity-70 hover:opacity-100 transition-all duration-500 cursor-default">
            
            {/* CQC Replica */}
            <div className="flex items-center gap-2 bg-charcoal-50 px-3 py-1.5 rounded border border-charcoal-200">
              <div className="w-6 h-6 rounded-full bg-[#E5005A] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">CQC</span>
              </div>
              <div className="font-sans text-xs font-bold text-navy leading-tight">
                Care Quality<br />Commission
              </div>
            </div>

            {/* GDC Replica */}
            <div className="flex flex-col items-center justify-center">
              <div className="font-serif text-2xl font-bold text-[#002f6c] tracking-widest leading-none">
                GDC
              </div>
              <span className="font-sans text-[9px] font-bold tracking-widest uppercase text-[#002f6c] mt-0.5">
                Protecting Patients
              </span>
            </div>

            {/* Invisalign Replica */}
            <div className="flex flex-col items-center">
              <div className="font-sans text-xl font-bold text-navy tracking-tight italic flex items-center">
                invisalign<sup className="text-[10px] ml-0.5 font-normal not-italic">®</sup>
              </div>
              <span className="bg-gold/10 text-gold px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mt-1">
                Diamond Provider
              </span>
            </div>

            {/* BACD Replica */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-navy flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-navy leading-none">BACD</span>
                <span className="font-sans text-[9px] font-medium uppercase text-charcoal-500 mt-1">Member</span>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  )
}
