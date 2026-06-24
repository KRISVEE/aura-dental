"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { BookingStep, TreatmentType, TimePreference, PatientDetails } from "@/types/booking"

interface BookingContextState {
  step: BookingStep
  direction: number
  treatment: TreatmentType | null
  preferredTime: TimePreference | null
  patientDetails: PatientDetails | null
  bookingReference: string | null
  
  // Actions
  setTreatment: (t: TreatmentType) => void
  setPreferredTime: (t: TimePreference) => void
  setPatientDetails: (d: PatientDetails) => void
  setBookingReference: (ref: string) => void
  nextStep: () => void
  previousStep: () => void
  resetBooking: () => void
}

const BookingContext = createContext<BookingContextState | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<BookingStep>(1)
  const [direction, setDirection] = useState<number>(1)
  const [treatment, setTreatment] = useState<TreatmentType | null>(null)
  const [preferredTime, setPreferredTime] = useState<TimePreference | null>(null)
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null)
  const [bookingReference, setBookingReference] = useState<string | null>(null)

  const nextStep = () => {
    setDirection(1)
    setStep((prev) => {
      // Guard: Cannot proceed if current step data is missing
      if (prev === 1 && !treatment) return prev;
      if (prev === 2 && !preferredTime) return prev;
      if (prev === 3 && !patientDetails) return prev;
      
      return (prev < 5 ? prev + 1 : prev) as BookingStep
    })
  }

  const previousStep = () => {
    setDirection(-1)
    setStep((prev) => (prev > 1 ? prev - 1 : prev) as BookingStep)
  }

  const resetBooking = () => {
    setStep(1)
    setDirection(1)
    setTreatment(null)
    setPreferredTime(null)
    setPatientDetails(null)
    setBookingReference(null)
  }

  return (
    <BookingContext.Provider
      value={{
        step,
        direction,
        treatment,
        preferredTime,
        patientDetails,
        bookingReference,
        setTreatment,
        setPreferredTime,
        setPatientDetails,
        setBookingReference,
        nextStep,
        previousStep,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBookingWizard() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBookingWizard must be used within a BookingProvider")
  }
  return context
}
