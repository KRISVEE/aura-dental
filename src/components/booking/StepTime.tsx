"use client"

import { Sun, Sunset, Moon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useBookingWizard } from "@/contexts/BookingContext"
import { TimePreference } from "@/types/booking"

const times: { id: TimePreference; title: string; desc: string; icon: React.ElementType }[] = [
  { id: "morning", title: "Morning", desc: "8am - 12pm", icon: Sun },
  { id: "afternoon", title: "Afternoon", desc: "12pm - 4pm", icon: Sunset },
  { id: "evening", title: "Evening", desc: "4pm - 8pm", icon: Moon },
  { id: "anytime", title: "Anytime", desc: "First available", icon: Clock },
]

export function StepTime() {
  const { preferredTime, setPreferredTime, nextStep } = useBookingWizard()

  const handleSelect = (id: TimePreference) => {
    setPreferredTime(id)
    setTimeout(() => nextStep(), 400)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-navy mb-2">When works best?</h2>
        <p className="text-charcoal-500">Choose your preferred time of day.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {times.map((t) => {
          const isSelected = preferredTime === t.id
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={cn(
                "flex items-center p-6 rounded-xl border-2 transition-all duration-300 group",
                isSelected 
                  ? "border-gold bg-gold/5 shadow-[0_4px_20px_rgba(212,175,55,0.15)]" 
                  : "border-charcoal-200 hover:border-gold/50 hover:shadow-md bg-white"
              )}
            >
              <div className={cn("p-3 rounded-full mr-4 transition-colors", isSelected ? "bg-gold/20 text-gold" : "bg-charcoal-200 text-charcoal-500 group-hover:text-gold")}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-medium text-navy">{t.title}</h3>
                <p className="text-sm text-charcoal-500">{t.desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
