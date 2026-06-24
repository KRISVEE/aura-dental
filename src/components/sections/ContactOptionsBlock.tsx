"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { clinicConfig } from "@/config/clinic";
import { whatsappConfig } from "@/config/whatsapp";
import { trackEvent } from "@/lib/analytics";

export function ContactOptionsBlock() {
  const handleWhatsApp = () => {
    trackEvent("contact_option_click", { method: "whatsapp" });
    window.open(whatsappConfig.getUrl(), "_blank", "noopener,noreferrer");
  };

  const handlePhone = () => {
    trackEvent("contact_option_click", { method: "phone" });
    window.location.href = `tel:${clinicConfig.contact.phone.replace(/\s/g, "")}`;
  };

  const handleEmail = () => {
    trackEvent("contact_option_click", { method: "email" });
    window.location.href = `mailto:${clinicConfig.contact.email}`;
  };

  return (
    <section className="py-20 bg-charcoal-50 border-t border-charcoal-200">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-charcoal-200 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-navy mb-4">Need help choosing a treatment?</h2>
          <p className="text-charcoal-600 text-lg mb-10 max-w-2xl mx-auto">
            Speak directly with our Patient Coordinator. We're here to answer your questions, explain the process, and help you find the right path for your smile.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="block font-medium text-navy">WhatsApp</span>
                <span className="text-xs text-charcoal-500 mt-1">Instant replies</span>
              </div>
            </button>

            {/* Phone */}
            <button
              onClick={handlePhone}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-navy/5 hover:bg-navy/10 border border-navy/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="block font-medium text-navy">Call Clinic</span>
                <span className="text-xs text-charcoal-500 mt-1">{clinicConfig.contact.phone}</span>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={handleEmail}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-charcoal-100/50 hover:bg-charcoal-100 border border-charcoal-200 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-charcoal-800 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="block font-medium text-navy">Email Us</span>
                <span className="text-xs text-charcoal-500 mt-1">Response within 24h</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
