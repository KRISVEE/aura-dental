"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { estimatorConfig, EstimatorTreatment, EstimatorScope } from "@/config/estimator";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Calculator, Loader2 } from "lucide-react";

export function TreatmentEstimator() {
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [selectedTreatment, setSelectedTreatment] = React.useState<EstimatorTreatment | null>(null);
  const [selectedScope, setSelectedScope] = React.useState<EstimatorScope | null>(null);
  
  // Form State
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize
  React.useEffect(() => {
    trackEvent("calculator_started");
  }, []);

  const handleTreatmentSelect = (treatment: EstimatorTreatment) => {
    setSelectedTreatment(treatment);
    setSelectedScope(null);
    setStep(2);
  };

  const handleScopeSelect = (scope: EstimatorScope) => {
    setSelectedScope(scope);
    setStep(3);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !selectedTreatment || !selectedScope) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          treatment: selectedTreatment.label,
          scope: selectedScope.label,
          estimatedRange: selectedScope.priceRange,
        }),
      });

      if (res.ok) {
        trackEvent("calculator_completed", { treatment: selectedTreatment.id, scope: selectedScope.id });
        setStep(4);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-charcoal-50 border-y border-charcoal-200">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-6">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-4">Estimate Your Smile Investment</h2>
          <p className="text-lg text-charcoal-600">
            Get an instant estimate before booking your consultation. Select your desired treatment below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-sm border border-charcoal-200 overflow-hidden min-h-[400px] flex flex-col relative">
          
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-charcoal-100 flex">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8 md:p-12 flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Select Treatment */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-serif text-navy text-center mb-8">Step 1: Choose Your Treatment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {estimatorConfig.treatments.map((treatment) => (
                      <button
                        key={treatment.id}
                        onClick={() => handleTreatmentSelect(treatment)}
                        className="p-6 rounded-2xl border border-charcoal-200 hover:border-gold hover:bg-gold/5 text-left transition-all group"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-navy text-lg group-hover:text-gold transition-colors">{treatment.label}</span>
                          <ChevronRight className="w-5 h-5 text-charcoal-400 group-hover:text-gold transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Select Scope */}
              {step === 2 && selectedTreatment && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <button onClick={() => setStep(1)} className="text-sm font-medium text-charcoal-500 hover:text-navy mb-4 transition-colors">
                    ← Back to Treatments
                  </button>
                  <h3 className="text-2xl font-serif text-navy text-center mb-8">Step 2: Choose Treatment Scope</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedTreatment.scopes.map((scope) => (
                      <button
                        key={scope.id}
                        onClick={() => handleScopeSelect(scope)}
                        className="p-6 rounded-2xl border border-charcoal-200 hover:border-gold hover:bg-gold/5 text-left transition-all group"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-navy text-lg group-hover:text-gold transition-colors">{scope.label}</span>
                          <ChevronRight className="w-5 h-5 text-charcoal-400 group-hover:text-gold transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Lead Capture */}
              {step === 3 && selectedScope && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={() => setStep(2)} className="text-sm font-medium text-charcoal-500 hover:text-navy mb-4 transition-colors">
                    ← Back to Scope
                  </button>
                  <h3 className="text-2xl font-serif text-navy text-center mb-2">Where should we send your estimate?</h3>
                  <p className="text-center text-charcoal-500 mb-8">Enter your details to view your personalized pricing estimate instantly.</p>
                  
                  <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">Last Name</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-charcoal-200 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <Button type="submit" className="w-full py-6 text-lg rounded-xl shadow-luxury mt-4" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "View My Estimate"}
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Results */}
              {step === 4 && selectedScope && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl text-charcoal-500 font-medium tracking-wide uppercase mb-2">Estimated Investment</h3>
                  <div className="text-5xl md:text-6xl font-serif text-navy mb-6">
                    {selectedScope.priceRange}
                  </div>
                  
                  <div className="bg-pearl p-6 rounded-2xl border border-charcoal-200 max-w-sm mx-auto mb-8">
                    <p className="text-sm text-charcoal-500 uppercase tracking-widest font-bold mb-1">Flexible Finance</p>
                    <p className="text-lg text-navy font-medium">Starting from <span className="text-gold">{selectedScope.financeFrom}</span></p>
                  </div>

                  <p className="text-sm text-charcoal-400 max-w-md mx-auto mb-10">
                    *Please note: This is an estimate based on average {selectedTreatment?.label.toLowerCase()} cases. Your final treatment cost will be confirmed accurately after a thorough clinical consultation.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      href="/?booking=true"
                      onClick={() => trackEvent("calculator_consultation_booked")}
                      className="w-full sm:w-auto bg-navy hover:bg-gold text-white px-8 py-4 rounded-xl font-medium transition-colors shadow-luxury flex items-center justify-center group"
                    >
                      Book Consultation
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={() => trackEvent("contact_option_click", { method: "whatsapp_from_calculator" })}
                      className="w-full sm:w-auto bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white px-8 py-4 rounded-xl font-medium transition-colors border border-[#25D366]/20"
                    >
                      Speak on WhatsApp
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
