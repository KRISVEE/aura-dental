"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function TrustWall() {
  const credentials = [
    { name: "CQC Registered", desc: "Regulated Healthcare" },
    { name: "GDC Registered", desc: "Professional Standards" },
    { name: "Invisalign Provider", desc: "Platinum Status" },
    { name: "BACD Member", desc: "Cosmetic Excellence" }
  ];

  return (
    <div className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-charcoal-200">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-serif text-navy mb-2">Recognised for Clinical Excellence</h3>
        <p className="text-charcoal-500">Regulated and accredited by leading UK dental authorities.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
        {credentials.map((cred, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center space-y-3"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold">
              {/* Placeholder for actual SVG logos, using a premium checkmark for now */}
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="font-semibold text-navy text-sm md:text-base">{cred.name}</p>
              <p className="text-xs text-charcoal-500 mt-1">{cred.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
