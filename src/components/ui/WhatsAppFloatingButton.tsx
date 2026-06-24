"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappConfig } from "@/config/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useState, useEffect } from "react";

export function WhatsAppFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a slight delay so it doesn't distract from initial load
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    trackEvent("whatsapp_click", { location: "floating_button" });
    window.open(whatsappConfig.getUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Unread dot indicator for extra attention */}
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
