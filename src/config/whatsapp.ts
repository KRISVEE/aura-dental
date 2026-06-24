export const whatsappConfig = {
  // Use country code without + or 00. Example: 447000000000 for UK
  phoneNumber: "447000000000",
  
  // Default message for generic questions
  defaultMessage: "Hello Aura Dental,\n\nI have a question about your treatment options and would like some information.\n\nThank you.",
  
  // Specific treatment pre-fills
  treatmentMessages: {
    implants: "Hello Aura Dental,\n\nI am interested in Dental Implants and would like more information.",
    veneers: "Hello Aura Dental,\n\nI am interested in Veneers and would like more information.",
    invisalign: "Hello Aura Dental,\n\nI am interested in Invisalign and would like more information.",
  },
  
  // Generates the final wa.me URL
  getUrl: (message?: string) => {
    const text = message ? encodeURIComponent(message) : encodeURIComponent(whatsappConfig.defaultMessage);
    return `https://wa.me/${whatsappConfig.phoneNumber}?text=${text}`;
  }
};
