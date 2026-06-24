"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useBookingWizard } from "@/contexts/BookingContext"
import { useBookingModal } from "@/hooks/useBookingModal"

export function StepSuccess() {
  const { treatment, preferredTime, resetBooking } = useBookingWizard()
  const { closeModal } = useBookingModal()

  const handleReturn = () => {
    resetBooking()
    closeModal()
  }

  const handleBookAnother = () => {
    resetBooking()
  }

  const formatTreatment = (t: string | null) => {
    if (!t) return ""
    const map: Record<string, string> = {
      implants: "Dental Implants",
      veneers: "Veneers",
      invisalign: "Invisalign",
      makeover: "Smile Makeover",
      general: "General Consultation",
    }
    return map[t] || t
  }

  const formatTime = (t: string | null) => {
    if (!t) return ""
    const map: Record<string, string> = {
      morning: "Morning (8am - 12pm)",
      afternoon: "Afternoon (12pm - 4pm)",
      evening: "Evening (4pm - 8pm)",
      anytime: "Anytime (First Available)",
    }
    return map[t] || t
  }

  return (
    <div className="text-center py-8">
      <div 
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 text-green-500 mb-8"
      >
        <CheckCircle className="w-12 h-12" />
      </div>
      
      <h2 className="text-4xl font-serif text-navy mb-4">Deposit Secured</h2>
      <p className="text-lg text-charcoal-500 mb-8 max-w-sm mx-auto">
        Your consultation is reserved. Our concierge team will contact you shortly to confirm your exact appointment time.
      </p>

      <div className="bg-charcoal-200/30 rounded-xl p-6 mb-10 max-w-sm mx-auto text-left border border-charcoal-200">
        <h3 className="font-medium text-navy mb-4 border-b border-charcoal-200 pb-2">Booking Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-charcoal-500">Interest</span>
            <span className="font-medium text-navy">{formatTreatment(treatment)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-500">Preferred Time</span>
            <span className="font-medium text-navy">{formatTime(preferredTime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-charcoal-500">Holding Fee</span>
            <span className="font-medium text-green-600">£50.00 Paid</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <Button size="lg" onClick={handleReturn}>
          Return to Website
        </Button>
        <Button variant="ghost" onClick={handleBookAnother}>
          Book Another Consultation
        </Button>
      </div>
    </div>
  )
}
