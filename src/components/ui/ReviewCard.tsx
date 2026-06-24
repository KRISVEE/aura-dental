import { Star } from "lucide-react";
import { PatientReview } from "@/config/patient-results";
import Image from "next/image";

export function ReviewCard({ review }: { review: PatientReview }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-charcoal-200 hover:shadow-luxury transition-shadow duration-300 h-full flex flex-col relative">
      {/* Source Icon */}
      {review.source === "Google" && (
        <div className="absolute top-8 right-8">
          {/* Temporary pure CSS icon for Google instead of actual logo image to avoid broken links, but ideally an SVG */}
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">G</div>
        </div>
      )}
      {review.source === "Trustpilot" && (
        <div className="absolute top-8 right-8">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600 text-xs">T</div>
        </div>
      )}
      
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-gold text-gold" />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-charcoal-700 leading-relaxed mb-8 flex-grow">
        "{review.text}"
      </p>
      
      {/* Footer */}
      <div className="mt-auto border-t border-charcoal-100 pt-6">
        <p className="font-medium text-navy text-lg">{review.patientName}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-gold text-sm font-medium tracking-wide uppercase">{review.treatmentType}</p>
          <p className="text-charcoal-400 text-sm">{review.date}</p>
        </div>
      </div>
    </div>
  );
}
