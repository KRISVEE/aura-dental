export type TreatmentType = "Implants" | "Veneers" | "Invisalign" | "Smile Makeover" | "General";

export interface CaseStudy {
  id: string;
  patientName: string;
  treatmentType: TreatmentType;
  beforeImage: string;
  afterImage: string;
  patientGoal: string;
  treatmentOutcome: string;
  duration: string;
  challenge?: string;
  solution?: string;
  result?: string;
}

export interface VideoTestimonial {
  id: string;
  patientName: string;
  treatmentType: TreatmentType;
  quote: string;
  durationWatch: string;
  thumbnail: string;
  videoUrl: string; // YouTube or Vimeo embed URL
}

export interface PatientReview {
  id: string;
  patientName: string;
  rating: number;
  treatmentType: TreatmentType;
  date: string;
  text: string;
  source: "Google" | "Trustpilot" | "Direct";
}

export const patientResultsConfig = {
  stats: {
    totalTransformations: "500+",
    averageRating: "4.9/5",
    satisfactionRate: "98%",
    yearsExperience: "15+",
  },
  caseStudies: [
    {
      id: "cs-1",
      patientName: "James T.",
      treatmentType: "Implants",
      beforeImage: "https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=800&auto=format&fit=crop&blur=10",
      afterImage: "https://images.unsplash.com/photo-1598256989800-fea5ce5146ce?q=80&w=800&auto=format&fit=crop",
      patientGoal: "Replace missing teeth and restore confidence while eating.",
      treatmentOutcome: "Full arch restoration with permanent, natural-looking implants.",
      duration: "4 Months",
      challenge: "James had struggled with a failing bridge for years, leading to bone loss and difficulty eating solid foods. He felt deeply self-conscious about his smile.",
      solution: "We performed a full clinical assessment, utilizing 3D CBCT scanning to design a precise All-on-4 implant protocol. The procedure was carried out under conscious sedation for maximum comfort.",
      result: "James now has a fully restored, permanent arch of teeth that look and function completely naturally. His confidence has skyrocketed, and he can eat whatever he desires."
    },
    {
      id: "cs-2",
      patientName: "Sarah M.",
      treatmentType: "Smile Makeover",
      beforeImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop&blur=10",
      afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
      patientGoal: "Correct extreme discoloration and uneven tooth length.",
      treatmentOutcome: "10 custom porcelain veneers and laser gum contouring.",
      duration: "3 Weeks",
      challenge: "Sarah was unhappy with her severely stained and uneven teeth, which she frequently hid when taking photos.",
      solution: "Using Digital Smile Design, we showed Sarah exactly what her new smile would look like before we even started. We then placed 10 ultra-thin, hand-crafted porcelain veneers.",
      result: "A stunning, symmetrical, and bright smile that perfectly complements her facial features."
    },
    {
      id: "cs-3",
      patientName: "Emma L.",
      treatmentType: "Invisalign",
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop&blur=10",
      afterImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop",
      patientGoal: "Straighten crowding without visible metal braces.",
      treatmentOutcome: "Perfectly aligned teeth using clear aligner therapy.",
      duration: "8 Months",
    }
  ] as CaseStudy[],
  
  videos: [
    {
      id: "v-1",
      patientName: "Rebecca",
      treatmentType: "Smile Makeover",
      quote: "The team at Aura made me feel completely at ease.",
      durationWatch: "3 min watch",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Standard placeholder for now
    }
  ] as VideoTestimonial[],

  reviews: [
    {
      id: "r-1",
      patientName: "Michael Chen",
      rating: 5,
      treatmentType: "Veneers",
      date: "2 weeks ago",
      text: "I hid my smile for years. After getting veneers here, I can't stop smiling. The attention to detail and luxury service is unmatched.",
      source: "Google"
    },
    {
      id: "r-2",
      patientName: "Sarah Jenkins",
      rating: 5,
      treatmentType: "Implants",
      date: "1 month ago",
      text: "The team at Aura made me feel completely at ease. My new implants look indistinguishable from my natural teeth. Truly life-changing.",
      source: "Trustpilot"
    },
    {
      id: "r-3",
      patientName: "David O.",
      rating: 5,
      treatmentType: "Invisalign",
      date: "2 months ago",
      text: "A 5-star experience from start to finish. They explained every step of my Invisalign journey and the results are perfect. The clinic itself feels like a luxury hotel.",
      source: "Google"
    }
  ] as PatientReview[]
};
