import { Button } from "@/components/ui/Button"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="bg-navy py-24 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 mix-blend-screen rounded-l-full blur-3xl transform translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-white/5 mix-blend-screen rounded-r-full blur-2xl transform -translate-x-1/2" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 max-w-3xl mx-auto">
          Ready to experience premium dental care?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Take the first step towards your new smile. Secure your comprehensive specialist consultation today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/?booking=true">Book Your Consultation</Link>
          </Button>
          <p className="text-white/60 text-sm mt-4 sm:mt-0 sm:ml-4">
            £50 fully refundable deposit required.
          </p>
        </div>
      </div>
    </section>
  )
}
