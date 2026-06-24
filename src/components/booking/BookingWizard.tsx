"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowLeft } from "lucide-react"

import { useBookingModal } from "@/hooks/useBookingModal"
import { BookingProvider, useBookingWizard } from "@/contexts/BookingContext"
import { StepTreatment } from "./StepTreatment"
import { StepTime } from "./StepTime"
import { StepDetails } from "./StepDetails"
import { StepDeposit } from "./StepDeposit"
import { StepSuccess } from "./StepSuccess"

// Animation variants for directional sliding
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
}

function WizardContent() {
  const { isOpen, closeModal } = useBookingModal()
  const { step, direction, previousStep, resetBooking } = useBookingWizard()

  // Clear state when modal is fully closed
  React.useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        resetBooking()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, resetBooking])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-6 md:p-12">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.98 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full h-full sm:h-[800px] sm:max-h-[90vh] max-w-[700px] bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header & Progress */}
        <div className="relative pt-6 px-6 pb-4 border-b border-charcoal-200 bg-white z-10 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {step > 1 && step < 5 && (
              <button 
                onClick={previousStep}
                className="p-2 -ml-2 text-charcoal-500 hover:text-navy hover:bg-charcoal-200/50 rounded-full transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div id="booking-modal-title" className="text-sm font-medium text-gold uppercase tracking-widest">
              Step {step} of 5
            </div>
          </div>

          <button 
            onClick={closeModal}
            className="p-2 -mr-2 text-charcoal-500 hover:text-navy hover:bg-charcoal-200/50 rounded-full transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Progress Bar (absolute to sit exactly on the border bottom) */}
        <div className="absolute top-[72px] left-0 w-full h-0.5 bg-charcoal-200 z-10">
          <motion.div 
            className="h-full bg-gold"
            initial={{ width: `${((step - 1) / 5) * 100}%` }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        {/* Content Area */}
        <div className="relative p-6 md:p-10 overflow-x-hidden overflow-y-auto flex-grow bg-pearl/30">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full h-full"
            >
              {step === 1 && <StepTreatment />}
              {step === 2 && <StepTime />}
              {step === 3 && <StepDetails />}
              {step === 4 && <StepDeposit />}
              {step === 5 && <StepSuccess />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export function BookingWizard() {
  return (
    <BookingProvider>
      <AnimatePresence>
        <WizardContent />
      </AnimatePresence>
    </BookingProvider>
  )
}
