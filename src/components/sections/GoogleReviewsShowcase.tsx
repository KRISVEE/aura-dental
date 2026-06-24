"use client";

import { motion } from "framer-motion";
import { patientResultsConfig } from "@/config/patient-results";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { TrustWall } from "@/components/sections/TrustWall";
import { Star } from "lucide-react";

export function GoogleReviewsShowcase() {
  return (
    <section className="py-24 bg-pearl relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Trust Wall integration at the top */}
        <div className="mb-20">
          <TrustWall />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-gold font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Real Patient Experiences
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-navy">
              Consistently rated 5-stars by our patients.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-white px-6 py-4 rounded-full shadow-sm border border-charcoal-200"
          >
            <div className="text-4xl font-serif text-navy">{patientResultsConfig.stats.averageRating.split('/')[0]}</div>
            <div>
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-charcoal-500 font-medium tracking-wide uppercase">
                Based on {patientResultsConfig.stats.totalTransformations} reviews
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {patientResultsConfig.reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
