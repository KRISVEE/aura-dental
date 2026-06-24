"use client"

import React, { useState } from "react"
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"
import { ShieldCheck, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useBookingWizard } from "@/contexts/BookingContext"
import { toast } from "sonner"

export function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { nextStep } = useBookingWizard()

  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return
    }

    setIsProcessing(true)
    setError(null)

    // Confirm the payment
    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We aren't redirecting because we handle success via UI state
        // return_url: "...", 
      },
      redirect: "if_required", // Prevent automatic redirect so we can handle SPA transition
    })

    if (submitError) {
      // Show error to your customer (e.g., payment details incomplete)
      const errMessage = submitError.message ?? "An unexpected error occurred."
      setError(errMessage)
      toast.error(errMessage)
      setIsProcessing(false)
    } else {
      // Payment succeeded
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "purchase", {
          currency: "GBP",
          value: 50.0,
          transaction_id: `DEP_${Date.now()}`,
          items: [{ item_name: "Consultation Deposit" }]
        });
        window.gtag("event", "generate_lead", {
          currency: "GBP",
          value: 50.0,
        });
      }
      
      nextStep()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-charcoal-200/30 p-6 rounded-xl space-y-4 mb-6 border border-charcoal-200">
        <div className="flex items-start gap-4">
          <div className="bg-white p-2 rounded-full text-gold shrink-0 mt-1">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-navy">Fully Refundable</h4>
            <p className="text-sm text-charcoal-500">
              Your £50 deposit is refunded immediately upon attendance, or can be put towards your treatment.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-charcoal-200 shadow-sm">
        <PaymentElement 
          options={{ 
            layout: "tabs",
            wallets: {
              applePay: "auto",
              googlePay: "auto"
            }
          }} 
        />
        {error && (
          <div className="mt-4 text-sm text-red-500 font-medium">
            {error}
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 text-lg" 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          "Secure Booking - £50"
        )}
      </Button>
    </form>
  )
}
