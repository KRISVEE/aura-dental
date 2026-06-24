"use client"

import { CheckCircle, Clock, CalendarCheck, Stethoscope, FileText, Phone, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useBookingWizard } from "@/contexts/BookingContext"
import { useBookingModal } from "@/hooks/useBookingModal"
import { format } from "date-fns"

export function StepSuccess() {
  const { treatment, preferredTime, bookingReference, resetBooking } = useBookingWizard()
  const { closeModal } = useBookingModal()

  const handleReturn = () => {
    resetBooking()
    closeModal()
  }

  const formatTreatment = (t: string | null) => {
    if (!t) return "General Consultation"
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
    if (!t) return "First Available"
    const map: Record<string, string> = {
      morning: "Morning (8am - 12pm)",
      afternoon: "Afternoon (12pm - 4pm)",
      evening: "Evening (4pm - 8pm)",
      anytime: "Anytime (First Available)",
    }
    return map[t] || t
  }

  return (
    <div className="text-left py-6 max-w-2xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-500 mb-6 border-8 border-green-50/50 shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-navy mb-3 tracking-tight">Deposit Secured</h2>
        <p className="text-lg text-charcoal-500 max-w-lg mx-auto">
          Thank you for choosing Aura Dental. Your consultation request has been successfully submitted.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
        {/* Left Column: Timeline */}
        <div className="md:col-span-3 space-y-6">
          <h3 className="text-xl font-serif text-navy border-b border-charcoal-100 pb-3">What Happens Next?</h3>
          
          <div className="relative pl-4">
            {/* Vertical Line */}
            <div className="absolute top-4 bottom-4 left-[23px] w-[2px] bg-charcoal-100"></div>

            {/* Step 1: Deposit Secured */}
            <div className="relative flex items-start mb-6">
              <div className="absolute left-0 bg-green-500 rounded-full p-1 border-4 border-white z-10 shadow-sm">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="ml-10">
                <h4 className="text-sm font-bold text-navy">Deposit Secured</h4>
                <p className="text-xs text-charcoal-500 mt-1">Your consultation deposit has been successfully processed.</p>
              </div>
            </div>

            {/* Step 2: Concierge Review */}
            <div className="relative flex items-start mb-6">
              <div className="absolute left-0 bg-navy rounded-full p-1 border-4 border-white z-10 shadow-sm">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div className="ml-10">
                <h4 className="text-sm font-bold text-navy">Concierge Review</h4>
                <p className="text-xs text-charcoal-500 mt-1">Our patient concierge team is currently reviewing your clinical request.</p>
              </div>
            </div>

            {/* Step 3: Appointment Confirmation */}
            <div className="relative flex items-start mb-6">
              <div className="absolute left-0 bg-charcoal-200 rounded-full p-1 border-4 border-white z-10">
                <CalendarCheck className="w-4 h-4 text-charcoal-400" />
              </div>
              <div className="ml-10 opacity-70">
                <h4 className="text-sm font-medium text-navy">Appointment Confirmation</h4>
                <p className="text-xs text-charcoal-500 mt-1">We will contact you to confirm your exact appointment date and time.</p>
              </div>
            </div>

            {/* Step 4: Consultation */}
            <div className="relative flex items-start mb-6">
              <div className="absolute left-0 bg-charcoal-200 rounded-full p-1 border-4 border-white z-10">
                <Stethoscope className="w-4 h-4 text-charcoal-400" />
              </div>
              <div className="ml-10 opacity-70">
                <h4 className="text-sm font-medium text-navy">Specialist Consultation</h4>
                <p className="text-xs text-charcoal-500 mt-1">Meet with our specialist team at the clinic to discuss your dental goals.</p>
              </div>
            </div>

            {/* Step 5: Treatment Plan */}
            <div className="relative flex items-start">
              <div className="absolute left-0 bg-charcoal-200 rounded-full p-1 border-4 border-white z-10">
                <FileText className="w-4 h-4 text-charcoal-400" />
              </div>
              <div className="ml-10 opacity-70">
                <h4 className="text-sm font-medium text-navy">Personal Treatment Plan</h4>
                <p className="text-xs text-charcoal-500 mt-1">Receive a tailored treatment recommendation and cost breakdown.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Summary Card & Trust */}
        <div className="md:col-span-2 space-y-6">
          {/* Summary Card */}
          <div className="bg-white border border-charcoal-100 shadow-sm rounded-xl overflow-hidden">
            <div className="bg-navy/5 px-5 py-4 border-b border-charcoal-100">
              <h3 className="font-serif text-navy font-medium">Booking Summary</h3>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <div>
                <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Booking Reference</p>
                <p className="font-mono text-lg font-bold text-navy tracking-widest bg-navy/5 inline-block px-2 py-1 rounded">
                  {bookingReference || "PENDING"}
                </p>
              </div>
              <div className="pt-3 border-t border-charcoal-100">
                <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Current Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Pending Confirmation
                </span>
              </div>
              <div className="pt-3 border-t border-charcoal-100">
                <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Treatment Interest</p>
                <p className="font-medium text-navy">{formatTreatment(treatment)}</p>
              </div>
              <div className="pt-3 border-t border-charcoal-100">
                <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Preferred Time</p>
                <p className="font-medium text-navy">{formatTime(preferredTime)}</p>
              </div>
              <div className="pt-3 border-t border-charcoal-100">
                <p className="text-charcoal-400 text-xs uppercase tracking-wider mb-1">Date Requested</p>
                <p className="font-medium text-navy">{format(new Date(), "MMMM d, yyyy")}</p>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal-600 leading-relaxed">
                <strong className="text-navy block mb-1">Book with Confidence</strong>
                Your consultation deposit remains fully refundable according to clinic policy.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-charcoal-600 leading-relaxed">
                <strong className="text-navy block mb-1">Fast Response</strong>
                Our team typically responds within 24 business hours to secure your slot.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Contact */}
      <div className="border-t border-charcoal-100 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <p className="text-sm font-medium text-navy">Need assistance?</p>
          <div className="flex items-center gap-4 text-sm text-charcoal-500">
            <a href="tel:02080000000" className="flex items-center gap-1.5 hover:text-navy transition-colors">
              <Phone className="w-4 h-4" />
              020 8000 0000
            </a>
            <a href="mailto:hello@auradental.co.uk" className="flex items-center gap-1.5 hover:text-navy transition-colors">
              <Mail className="w-4 h-4" />
              hello@auradental.co.uk
            </a>
          </div>
        </div>
        
        <Button size="lg" onClick={handleReturn} className="w-full md:w-auto shadow-md">
          Return to Website
        </Button>
      </div>
    </div>
  )
}
