"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Do you offer financing or payment plans?",
    answer: "Yes, we offer 0% finance options over 12 months, or interest-bearing plans for up to 5 years, allowing you to spread the cost of your investment comfortably."
  },
  {
    question: "Are dental implants painful?",
    answer: "Most patients report that the procedure is much more comfortable than they anticipated. We use advanced local anesthesia and offer dental sedation for nervous patients to ensure a completely pain-free experience."
  },
  {
    question: "How long does a smile makeover take?",
    answer: "Timelines vary depending on the treatments required. A simple whitening and composite bonding case can be completed in a single afternoon, whereas a complex implant restoration may take 3-6 months. We will provide a precise timeline during your consultation."
  },
  {
    question: "Why do I need to pay a deposit for a consultation?",
    answer: "As a premium private clinic, our specialists' time is in high demand. The fully-refundable £50 deposit secures your dedicated 45-minute slot and reduces no-shows, allowing us to keep our wait times short. It can be refunded immediately after your visit or put towards your treatment."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section id="faq" className="py-32 bg-white relative">
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent" />
      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-20">
          <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Patient Guide
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-navy mb-6">Common Questions</h2>
          <p className="text-charcoal-500 text-lg font-light">
            Everything you need to know about our clinic, treatments, and fees.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div 
                key={index}
                className={cn(
                  "bg-white rounded-2xl border transition-all duration-500 overflow-hidden",
                  isOpen ? "border-gold/30 shadow-luxury" : "border-charcoal-200/60 shadow-sm hover:shadow-md hover:border-gold/20"
                )}
              >
                <button
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={cn("font-serif text-xl md:text-2xl transition-colors duration-300 pr-8", isOpen ? "text-navy" : "text-charcoal-900")}>
                    {faq.question}
                  </span>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300", isOpen ? "bg-gold/10" : "bg-charcoal-50")}>
                    <ChevronDown className={cn("w-5 h-5 text-gold transition-transform duration-500", isOpen && "rotate-180")} />
                  </div>
                </button>
                <div 
                  className={cn(
                    "px-8 text-charcoal-500 leading-relaxed font-light text-lg transition-all duration-500 ease-in-out overflow-hidden",
                    isOpen ? "max-h-96 pb-8 opacity-100" : "max-h-0 py-0 opacity-0"
                  )}
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
