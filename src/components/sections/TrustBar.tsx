import { Star } from "lucide-react"

export function TrustBar() {
  return (
    <section className="bg-white border-y border-charcoal-200 py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 overflow-x-auto no-scrollbar">
          
          {/* Google Reviews */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <div className="text-sm font-medium text-navy">
              <span className="block">4.9/5 from 500+ Reviews</span>
              <span className="text-charcoal-500 text-xs">Verified Google Patients</span>
            </div>
          </div>

          {/* Compliance & Accreditations (Text placeholders for logos) */}
          <div className="flex items-center gap-12 shrink-0 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            <div className="font-serif text-xl font-bold text-navy tracking-tighter">
              CQC
              <span className="block font-sans text-[10px] font-normal tracking-normal uppercase">Rated Good</span>
            </div>
            <div className="font-serif text-xl font-bold text-navy tracking-widest">
              GDC
              <span className="block font-sans text-[10px] font-normal tracking-normal uppercase">Registered</span>
            </div>
            <div className="font-sans text-lg font-bold text-navy tracking-tight italic">
              invisalign
              <span className="block font-sans text-[10px] font-normal tracking-normal not-italic uppercase text-gold">Diamond Provider</span>
            </div>
            <div className="font-serif text-lg font-bold text-navy">
              BACD
              <span className="block font-sans text-[10px] font-normal uppercase">Member</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
