"use client"

import { ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { clinicConfig } from "@/config/clinic"
import { whatsappConfig } from "@/config/whatsapp"
import { trackEvent } from "@/lib/analytics"

export function TreatmentGrid() {
  return (
    <section id="treatments" className="py-32 bg-white overflow-hidden relative">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-pearl via-white to-pearl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Our Expertise
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6 leading-tight">Mastery in Modern Dentistry</h2>
          <p className="text-charcoal-500 text-lg font-light leading-relaxed">
            We focus exclusively on high-value, life-changing procedures. Discover how our specialist team can transform your confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {clinicConfig.treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div 
                className="group bg-white rounded-2xl overflow-hidden shadow-luxury hover:shadow-[0_30px_60px_-15px_rgba(10,20,26,0.2)] transition-all duration-500 flex flex-col h-full border border-charcoal-200/50"
              >
                <div className="relative h-72 lg:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors z-10 duration-700 mix-blend-multiply" />
                  <Image 
                    src={treatment.image} 
                    alt={treatment.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
                <div className="p-10 flex-grow flex flex-col justify-between relative bg-white">
                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pearl to-transparent opacity-50 pointer-events-none rounded-bl-3xl" />
                  
                  <div>
                    <h3 className="text-3xl font-serif text-navy mb-4 group-hover:text-gold transition-colors duration-300">{treatment.title}</h3>
                    <p className="text-charcoal-500 leading-relaxed mb-8 font-light text-lg">
                      {treatment.shortDescription}
                    </p>
                    <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-charcoal-50 border border-charcoal-200 mb-8">
                      <p className="text-navy font-semibold text-sm tracking-wide">{treatment.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row items-center gap-3 mt-4 pt-6 border-t border-charcoal-100/50">
                    <Link 
                      href="/?booking=true"
                      className="w-full xl:w-auto flex-1 flex items-center justify-center bg-navy hover:bg-gold text-white px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-300"
                    >
                      Book Consult
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const message = whatsappConfig.treatmentMessages[treatment.id as keyof typeof whatsappConfig.treatmentMessages] || whatsappConfig.defaultMessage;
                        trackEvent("treatment_whatsapp_click", { treatment: treatment.id });
                        window.open(whatsappConfig.getUrl(message), "_blank", "noopener,noreferrer");
                      }}
                      className="w-full xl:w-auto flex-1 flex items-center justify-center bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors duration-300 border border-[#25D366]/20"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask on WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
