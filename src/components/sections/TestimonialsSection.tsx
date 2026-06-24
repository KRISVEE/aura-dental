import { Star, PlayCircle } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Jenkins",
    treatment: "Dental Implants",
    quote: "After years of hiding my smile, the team at Aura completely transformed my confidence. The process was completely painless and the results are incredibly natural.",
  },
  {
    name: "James Thorne",
    treatment: "Invisalign®",
    quote: "The digital scanning technology meant no messy impressions. I knew exactly what my teeth would look like before we even started. Simply world-class service.",
  },
  {
    name: "Emma Williams",
    treatment: "Porcelain Veneers",
    quote: "I traveled from outside London just to see this team. The attention to detail is unmatched. My veneers look like perfectly natural teeth.",
  }
]

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-24 bg-navy text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Featured Video Placeholder */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10" />
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
              alt="Patient video testimonial" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1} />
            </div>
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-serif text-2xl mb-1">Meet Rebecca</p>
              <p className="text-gold text-sm font-medium">Full Mouth Reconstruction</p>
            </div>
          </div>

          {/* Text Reviews */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-12">Don't just take our word for it.</h2>
            <div className="space-y-10">
              {testimonials.map((t, idx) => (
                <div key={idx} className="relative pl-6 border-l border-white/20 hover:border-gold transition-colors duration-300">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl font-serif italic text-white/90 mb-4">
                    "{t.quote}"
                  </p>
                  <div>
                    <span className="block font-medium">{t.name}</span>
                    <span className="text-sm text-gold">{t.treatment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
