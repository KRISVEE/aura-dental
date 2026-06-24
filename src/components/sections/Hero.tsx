import { Button } from "@/components/ui/Button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-pearl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-2xl z-10">
            <p className="text-gold font-semibold tracking-widest uppercase text-sm mb-6">
              Private Dentistry in London
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-navy leading-[1.1] mb-6">
              Transform Your Smile With Confidence.
            </h1>
            <p className="text-lg md:text-xl text-charcoal-500 mb-10 max-w-lg leading-relaxed">
              Award-winning implant and cosmetic dentistry designed around your comfort, using state-of-the-art digital technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/?booking=true">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#gallery">View Smile Gallery</Link>
              </Button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden shadow-2xl">
            {/* Realistic Placeholder for premium imagery */}
            <div className="absolute inset-0 bg-navy/5 mix-blend-multiply z-10" />
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2574&auto=format&fit=crop" 
              alt="Confident patient smiling" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
