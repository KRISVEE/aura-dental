"use client"

import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Loader2, AlertCircle } from "lucide-react"

import { useBookingWizard } from "@/contexts/BookingContext"
import { CheckoutForm } from "./CheckoutForm"

// Initialize Stripe outside component to avoid recreating the object
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function StepDeposit() {
  const { treatment, preferredTime, patientDetails } = useBookingWizard()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            treatment,
            preferredTime,
            patientDetails,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to initialize payment")
        }

        setClientSecret(data.clientSecret)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to initialize payment")
      }
    }

    createPaymentIntent()
  }, [treatment, preferredTime, patientDetails])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-navy mb-2">Secure Your Consultation</h2>
        <p className="text-charcoal-500 max-w-md mx-auto">
          Complete your reservation details below.
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      ) : !clientSecret ? (
        <div className="flex flex-col items-center justify-center py-12 text-navy/40">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p className="text-sm font-medium animate-pulse">Initializing secure payment...</p>
        </div>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
