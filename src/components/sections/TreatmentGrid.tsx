"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { clinicConfig } from "@/config/clinic"

export function TreatmentGrid() {
  return (
    <section id="treatments" className="py-24 bg-pearl overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Our Expertise</h2>
          <p className="text-charcoal-500 text-lg">
            We focus exclusively on high-value, life-changing procedures. Discover how our specialist team can transform your confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clinicConfig.treatments.map((treatment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                href="/?booking=true"
                className="group bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(15,32,39,0.04)] hover:shadow-[0_10px_40px_rgba(15,32,39,0.08)] transition-all duration-500 flex flex-col cursor-pointer block h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <Image 
                    src={treatment.image} 
                    alt={treatment.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-serif text-navy mb-3">{treatment.title}</h3>
                    <p className="text-charcoal-500 leading-relaxed mb-6">
                      {treatment.shortDescription}
                    </p>
                    <p className="text-gold font-medium mb-6">{treatment.price}</p>
                  </div>
                  <div className="flex items-center text-navy font-medium group-hover:text-gold transition-colors">
                    Discover {treatment.title}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
