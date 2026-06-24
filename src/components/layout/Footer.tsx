import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center">
                <span className="text-gold font-serif font-bold text-xl leading-none">A</span>
              </div>
              <span className="font-serif text-2xl font-medium tracking-tight">
                Aura Dental
              </span>
            </Link>
            <p className="text-charcoal-200 text-sm leading-relaxed max-w-xs">
              Premium implant and cosmetic dentistry designed around your comfort, using state-of-the-art digital technology.
            </p>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-serif text-lg mb-6">Treatments</h4>
            <ul className="space-y-4 text-sm text-charcoal-200">
              <li><Link href="#" className="hover:text-gold transition-colors">Dental Implants</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Porcelain Veneers</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Invisalign®</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Smile Makeovers</Link></li>
            </ul>
          </div>

          {/* Patient Info */}
          <div>
            <h4 className="font-serif text-lg mb-6">Patient Info</h4>
            <ul className="space-y-4 text-sm text-charcoal-200">
              <li><Link href="#" className="hover:text-gold transition-colors">Fees & Finance</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Our Team</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Smile Gallery</Link></li>
              <li><Link href="#" className="hover:text-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Visit Us</h4>
            <address className="not-italic text-sm text-charcoal-200 space-y-4">
              <p>123 Harley Street<br />London, W1G 6AL</p>
              <p>
                <a href="tel:02081234567" className="hover:text-gold transition-colors">020 8123 4567</a><br />
                <a href="mailto:hello@auradental.co.uk" className="hover:text-gold transition-colors">hello@auradental.co.uk</a>
              </p>
              <p className="pt-2">
                Mon - Fri: 8am - 6pm<br />
                Sat: By Appointment
              </p>
            </address>
          </div>
        </div>

        {/* Legal & Compliance */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} Aura Dental. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Complaints Procedure</Link>
            <span>GDC No: 123456</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
