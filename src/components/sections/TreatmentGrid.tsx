import { ArrowRight } from "lucide-react"
import Link from "next/link"

const treatments = [
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking solutions to replace missing teeth, from single implants to full mouth restorations.",
    image: "https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Porcelain Veneers",
    description: "Hand-crafted ceramic restorations designed to perfect the shape, color, and alignment of your smile.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Invisalign®",
    description: "Virtually invisible, comfortable aligners that predictably straighten your teeth using advanced 3D scanning.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Smile Makeovers",
    description: "Comprehensive, bespoke treatment plans combining multiple disciplines for a total smile transformation.",
    image: "https://images.unsplash.com/photo-1537368910025-702804f9810a?q=80&w=2000&auto=format&fit=crop",
  }
]

export function TreatmentGrid() {
  return (
    <section id="treatments" className="py-24 bg-pearl">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Our Expertise</h2>
          <p className="text-charcoal-500 text-lg">
            We focus exclusively on high-value, life-changing procedures. Discover how our specialist team can transform your confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {treatments.map((treatment, index) => (
            <Link 
              key={index} 
              href="/?booking=true"
              className="group bg-white rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(15,32,39,0.04)] hover:shadow-[0_10px_40px_rgba(15,32,39,0.08)] transition-all duration-500 flex flex-col cursor-pointer block"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors z-10 duration-500" />
                <img 
                  src={treatment.image} 
                  alt={treatment.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-navy mb-3">{treatment.title}</h3>
                  <p className="text-charcoal-500 leading-relaxed mb-6">
                    {treatment.description}
                  </p>
                </div>
                <div className="flex items-center text-navy font-medium group-hover:text-gold transition-colors">
                  Discover {treatment.title}
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
