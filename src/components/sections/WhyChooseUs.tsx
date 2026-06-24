"use client";

import { motion } from "framer-motion";
import { 
  Star, 
  ShieldCheck, 
  Award, 
  CreditCard, 
  Users, 
  Sparkles,
  CheckCircle2,
  CalendarHeart
} from "lucide-react";
import { trustMetrics } from "@/config/trust-metrics";

const indicators = [
  {
    title: "500+ 5-Star Reviews",
    description: "Trusted by our local community",
    icon: Star,
  },
  {
    title: "Specialist Implant Team",
    description: "Expert care for complex procedures",
    icon: Award,
  },
  {
    title: "Fully Refundable Deposit",
    description: "Risk-free consultation booking",
    icon: ShieldCheck,
  },
  {
    title: "Digital Smile Design",
    description: "See your smile before treatment",
    icon: Sparkles,
  },
  {
    title: "Flexible Finance Options",
    description: "Spread the cost of your treatment",
    icon: CreditCard,
  },
  {
    title: "Personal Coordinator",
    description: "Dedicated support throughout your journey",
    icon: Users,
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-charcoal-50 py-20 lg:py-24 border-b border-charcoal-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-navy mb-6 tracking-tight"
          >
            Why Patients Choose Aura Dental
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-charcoal-500"
          >
            We combine clinical excellence with a five-star patient experience, ensuring your journey to a new smile is seamless and stress-free.
          </motion.p>
        </div>

        {/* 6 Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={indicator.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-charcoal-100 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className="bg-navy/5 text-navy p-3 rounded-xl shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-navy mb-1">{indicator.title}</h3>
                  <p className="text-sm text-charcoal-500">{indicator.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Finance Confidence */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-navy to-[#0A1A2F] p-8 md:p-10 rounded-3xl text-white relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            
            <CreditCard className="w-10 h-10 text-gold mb-6" />
            <h3 className="text-2xl font-serif mb-4">Flexible payment options available</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>Monthly payment options</span>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>Comprehensive treatment financing</span>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>100% transparent pricing</span>
              </li>
            </ul>
          </motion.div>

          {/* Consultation Confidence */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl border border-charcoal-200 shadow-sm relative overflow-hidden"
          >
            <CalendarHeart className="w-10 h-10 text-navy mb-6" />
            <h3 className="text-2xl font-serif text-navy mb-4">Risk-Free Consultation</h3>
            <div className="space-y-4 text-charcoal-600">
              <p>
                Taking the first step should never be stressful. That's why your £50 consultation deposit is <strong>fully refundable</strong> according to our clinic policy.
              </p>
              <p>
                From your very first visit, a dedicated treatment coordinator will be assigned to guide you through the process, answer your questions, and ensure you feel entirely comfortable.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Social Proof Statistics (Config-driven) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border-y md:border md:rounded-3xl border-charcoal-200 py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-charcoal-100"
        >
          <div className="pt-6 md:pt-0 w-full">
            <div className="text-4xl font-serif text-navy font-bold mb-2">{trustMetrics.reviewsCount}</div>
            <div className="text-sm text-charcoal-500 uppercase tracking-wider font-medium">Successful Smiles</div>
          </div>
          <div className="pt-6 md:pt-0 w-full">
            <div className="text-4xl font-serif text-navy font-bold mb-2">{trustMetrics.rating}</div>
            <div className="text-sm text-charcoal-500 uppercase tracking-wider font-medium">Patient Rating</div>
          </div>
          <div className="pt-6 md:pt-0 w-full">
            <div className="text-4xl font-serif text-navy font-bold mb-2">{trustMetrics.yearsExperience}</div>
            <div className="text-sm text-charcoal-500 uppercase tracking-wider font-medium">Years Experience</div>
          </div>
          <div className="pt-6 md:pt-0 w-full">
            <div className="text-4xl font-serif text-navy font-bold mb-2">{trustMetrics.patientSatisfaction}</div>
            <div className="text-sm text-charcoal-500 uppercase tracking-wider font-medium">Satisfaction Rate</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
