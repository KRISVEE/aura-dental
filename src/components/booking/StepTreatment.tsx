"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBookingWizard } from "@/contexts/BookingContext"
import { TreatmentType } from "@/types/booking"

const treatments: { id: TreatmentType; title: string; desc: string }[] = [
  { id: "implants", title: "Dental Implants", desc: "Permanent tooth replacement" },
  { id: "veneers", title: "Veneers", desc: "Porcelain smile design" },
  { id: "invisalign", title: "Invisalign", desc: "Clear aligner therapy" },
  { id: "makeover", title: "Smile Makeover", desc: "Comprehensive restoration" },
  { id: "general", title: "General Consultation", desc: "Checkup and advice" },
]

export function StepTreatment() {
  const { treatment, setTreatment, nextStep } = useBookingWizard()

  const handleSelect = (id: TreatmentType) => {
    setTreatment(id)
    setTimeout(() => nextStep(), 400) // Small delay to see selection
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-navy mb-2">What are you interested in?</h2>
        <p className="text-charcoal-500">Select a treatment to tailor your consultation.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {treatments.map((t) => {
          const isSelected = treatment === t.id
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={cn(
                "relative text-left p-6 rounded-xl border-2 transition-all duration-300 overflow-hidden group",
                isSelected 
                  ? "border-gold bg-gold/5 shadow-[0_4px_20px_rgba(212,175,55,0.15)]" 
                  : "border-charcoal-200 hover:border-gold/50 hover:shadow-md bg-white"
              )}
            >
              <div className="relative z-10">
                <h3 className={cn("text-lg font-medium mb-1 transition-colors", isSelected ? "text-navy" : "text-navy")}>
                  {t.title}
                </h3>
                <p className={cn("text-sm transition-colors", isSelected ? "text-navy/80" : "text-charcoal-500")}>
                  {t.desc}
                </p>
              </div>
              
              {isSelected && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 right-6"
                >
                  <CheckCircle2 className="w-6 h-6 text-gold fill-gold/20" />
                </motion.div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
