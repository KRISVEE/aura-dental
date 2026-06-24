"use client";

import { motion } from "framer-motion";
import { Calendar, AlertCircle, CheckCircle2, XCircle, ChevronRight, TrendingUp } from "lucide-react";
import { availabilityConfig, DayAvailability, AvailabilityStatus } from "@/config/availability";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";
import Link from "next/link";

export function AvailabilitySection() {
  useEffect(() => {
    // Only track once when the component mounts
    trackEvent("availability_section_viewed");
  }, []);

  const handleBookingClick = () => {
    trackEvent("availability_booking_click", { location: "availability_section" });
  };

  const getStatusDisplay = (day: DayAvailability) => {
    switch (day.status) {
      case "fully_booked":
        return (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-md font-medium text-sm">
            <XCircle className="w-4 h-4" />
            Fully Booked
          </div>
        );
      case "limited":
        return (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-md font-medium text-sm">
            <AlertCircle className="w-4 h-4" />
            {day.slotsRemaining === 1 ? "1 Slot Remaining" : `${day.slotsRemaining} Slots Remaining`}
          </div>
        );
      case "high":
        return (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-md font-medium text-sm">
            <CheckCircle2 className="w-4 h-4" />
            {day.slotsRemaining} Slots Available
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-white py-20 border-t border-charcoal-200">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-50 px-4 py-2 rounded-full font-medium text-sm mb-6 border border-amber-200/50">
            <TrendingUp className="w-4 h-4" />
            {availabilityConfig.demandMessage}
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-navy tracking-tight mb-4">
            Specialist Consultation Availability
          </h2>
          <p className="text-charcoal-500 text-lg max-w-2xl mx-auto">
            Our specialists are highly sought after. Secure your appointment today to begin your transformation journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Availability Schedule */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white rounded-3xl border border-charcoal-200 shadow-sm overflow-hidden"
          >
            <div className="bg-charcoal-50 px-6 py-4 border-b border-charcoal-200 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-navy" />
              <h3 className="font-serif text-navy text-lg font-medium">This Week</h3>
            </div>
            <div className="divide-y divide-charcoal-100">
              {availabilityConfig.schedule.map((day) => (
                <div key={day.day} className="flex items-center justify-between p-6 hover:bg-charcoal-50/50 transition-colors">
                  <span className="font-medium text-navy text-lg">{day.day}</span>
                  {getStatusDisplay(day)}
                </div>
              ))}
            </div>
            
            {/* Urgency Banner */}
            <div className="bg-red-50 border-t border-red-100 p-4 text-center">
              <p className="text-red-700 font-medium text-sm">
                {availabilityConfig.bannerMessage}
              </p>
            </div>
          </motion.div>

          {/* Booking Motivation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-navy rounded-3xl p-8 text-white shadow-luxury">
              <h3 className="text-2xl font-serif mb-6">Why secure your consultation now?</h3>
              <ul className="space-y-4 mb-8">
                {availabilityConfig.motivationPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-white/90 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/?booking=true"
                onClick={handleBookingClick}
                className="flex items-center justify-center w-full bg-gold hover:bg-white hover:text-navy text-navy font-semibold px-6 py-4 rounded-xl transition-colors duration-300 shadow-md uppercase tracking-wide text-sm group"
              >
                Secure Your Slot
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <p className="text-center text-xs text-charcoal-400 max-w-xs mx-auto">
              Please note: Appointments are confirmed on a first-come, first-served basis upon receipt of the deposit.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
