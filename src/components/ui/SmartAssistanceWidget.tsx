"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Calendar } from "lucide-react";
import { whatsappConfig } from "@/config/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useState, useEffect } from "react";
import Link from "next/link";

const DISMISS_KEY = "aura_assistance_widget_dismissed";

export function SmartAssistanceWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISS_KEY) === "true";
    if (isDismissed) return;

    // Show after 20 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      trackEvent("assistance_widget_view");
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISS_KEY, "true");
    trackEvent("assistance_widget_dismiss");
  };

  const handleWhatsApp = () => {
    trackEvent("assistance_widget_click", { action: "whatsapp" });
    window.open(whatsappConfig.getUrl(), "_blank", "noopener,noreferrer");
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-luxury border border-charcoal-200/50 w-72 md:w-80 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-navy p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 bg-charcoal-50 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-navy font-serif font-bold text-xs">AD</span>
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-navy rounded-full"></div>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm">Patient Coordinator</h4>
                <p className="text-white/70 text-[10px] uppercase tracking-wide">Online Now</p>
              </div>
            </div>
            <button 
              onClick={handleDismiss}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Dismiss assistance widget"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5">
            <p className="text-charcoal-600 text-sm mb-5 leading-relaxed">
              Have a question before booking? We're here to help you understand your treatment options.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 rounded-xl font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
              
              <Link
                href="/?booking=true"
                onClick={() => trackEvent("assistance_widget_click", { action: "book" })}
                className="flex items-center justify-center gap-2 w-full bg-white hover:bg-charcoal-50 text-navy border border-charcoal-200 py-2.5 rounded-xl font-medium text-sm transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
