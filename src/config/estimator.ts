export interface EstimatorScope {
  id: string;
  label: string;
  priceRange: string;
  financeFrom: string;
}

export interface EstimatorTreatment {
  id: string;
  label: string;
  scopes: EstimatorScope[];
}

export const estimatorConfig = {
  treatments: [
    {
      id: "implants",
      label: "Dental Implants",
      scopes: [
        { id: "single", label: "Single Tooth", priceRange: "£2,500 - £3,500", financeFrom: "£89/month" },
        { id: "multiple", label: "Multiple Teeth", priceRange: "£4,000 - £8,000", financeFrom: "£149/month" },
        { id: "full_arch", label: "Full Arch (All-on-4)", priceRange: "£12,000 - £16,000", financeFrom: "£299/month" },
      ],
    },
    {
      id: "veneers",
      label: "Porcelain Veneers",
      scopes: [
        { id: "4_veneers", label: "4 Veneers", priceRange: "£3,400 - £4,000", financeFrom: "£120/month" },
        { id: "6_veneers", label: "6 Veneers", priceRange: "£5,100 - £6,000", financeFrom: "£180/month" },
        { id: "8_veneers", label: "8 Veneers", priceRange: "£6,800 - £8,000", financeFrom: "£240/month" },
        { id: "full_smile", label: "Full Smile Makeover", priceRange: "£8,500+", financeFrom: "£299/month" },
      ],
    },
    {
      id: "invisalign",
      label: "Invisalign",
      scopes: [
        { id: "mild", label: "Mild Crowding", priceRange: "£2,500 - £3,000", financeFrom: "£89/month" },
        { id: "moderate", label: "Moderate Crowding", priceRange: "£3,500 - £4,000", financeFrom: "£120/month" },
        { id: "complex", label: "Complex Case", priceRange: "£4,500 - £5,000", financeFrom: "£150/month" },
      ],
    },
    {
      id: "smile_makeover",
      label: "Smile Makeover",
      scopes: [
        { id: "consultation", label: "Full Assessment Required", priceRange: "Custom Treatment Plan", financeFrom: "Flexible Options" },
      ]
    }
  ] as EstimatorTreatment[]
};
