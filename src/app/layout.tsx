import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { clinicConfig } from "@/config/clinic";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.auradental.co.uk"),
  title: {
    default: clinicConfig.seo.defaultTitle,
    template: `%s | ${clinicConfig.name}`,
  },
  description: clinicConfig.seo.defaultDescription,
  keywords: clinicConfig.seo.keywords,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    title: clinicConfig.seo.defaultTitle,
    description: clinicConfig.seo.defaultDescription,
    siteName: clinicConfig.name,
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public/
        width: 1200,
        height: 630,
        alt: clinicConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: clinicConfig.seo.defaultTitle,
    description: clinicConfig.seo.defaultDescription,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    name: clinicConfig.legalName,
    image: "https://www.auradental.co.uk/og-image.jpg",
    "@id": "https://www.auradental.co.uk",
    url: "https://www.auradental.co.uk",
    telephone: clinicConfig.contact.phone,
    email: clinicConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinicConfig.contact.address.street,
      addressLocality: clinicConfig.contact.address.city,
      postalCode: clinicConfig.contact.address.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5205, // Approximation for Wimpole St
      longitude: -0.1494,
    },
    openingHoursSpecification: clinicConfig.openingHours
      .filter((h) => h.hours !== "Closed")
      .map((h) => {
        const [open, close] = h.hours.split(" - ");
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: open,
          closes: close,
        };
      }),
    priceRange: "£££",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-gold/30 selection:text-navy">
        {/* Inject JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
