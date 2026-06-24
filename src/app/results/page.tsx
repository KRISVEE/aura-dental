"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { patientResultsConfig, TreatmentType } from "@/config/patient-results";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState<TreatmentType | "All">("All");

  const filters: (TreatmentType | "All")[] = ["All", "Implants", "Veneers", "Invisalign", "Smile Makeover"];

  const filteredStudies = activeFilter === "All" 
    ? patientResultsConfig.caseStudies 
    : patientResultsConfig.caseStudies.filter(study => study.treatmentType === activeFilter);

  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-24">
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-navy mb-6 leading-tight">
              Real Patient Transformations
            </h1>
            <p className="text-xl text-charcoal-500 font-light leading-relaxed">
              Explore our gallery of life-changing smile makeovers. Every result is uniquely designed to complement the patient's natural facial aesthetics.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-navy text-white shadow-md" 
                    : "bg-white text-charcoal-600 border border-charcoal-200 hover:border-navy hover:text-navy"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence>
              {filteredStudies.map((study) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={study.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-charcoal-200 group flex flex-col"
                >
                  {/* Image Grid */}
                  <div className="grid grid-cols-2 gap-1 relative aspect-[4/3] bg-charcoal-100">
                    <div className="relative h-full w-full">
                      <Image src={study.beforeImage} alt="Before" fill className="object-cover" />
                      <div className="absolute top-4 left-4 glass-panel text-navy px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-white/40">Before</div>
                    </div>
                    <div className="relative h-full w-full">
                      <Image src={study.afterImage} alt="After" fill className="object-cover" />
                      <div className="absolute top-4 right-4 glass-panel text-navy px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm border border-white/40">After</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gold font-medium tracking-wide uppercase text-sm">{study.treatmentType}</span>
                      <span className="text-charcoal-400 text-sm font-medium">{study.duration}</span>
                    </div>
                    <h3 className="text-2xl font-serif text-navy mb-2">{study.patientName}'s Transformation</h3>
                    <p className="text-charcoal-600 leading-relaxed mb-6">"{study.patientGoal}"</p>
                    
                    <div className="mt-auto bg-pearl p-4 rounded-xl border border-charcoal-100">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-widest mb-1">Outcome</h4>
                      <p className="text-charcoal-800 text-sm font-medium">{study.treatmentOutcome}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-charcoal-500 text-lg">More case studies coming soon.</p>
            </div>
          )}
        </div>
      </main>
      <FinalCTA />
      <Footer />
    </>
  );
}
