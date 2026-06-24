"use client"

import * as React from "react"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled ? "glass-panel shadow-glass py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-navy rounded-sm flex items-center justify-center">
            <span className="text-gold font-serif font-bold text-xl leading-none">A</span>
          </div>
          <span className="font-serif text-2xl font-medium tracking-tight text-navy">
            Aura Dental
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#treatments" className="text-sm font-medium text-navy hover:text-gold transition-colors">Treatments</Link>
          <Link href="#gallery" className="text-sm font-medium text-navy hover:text-gold transition-colors">Smile Gallery</Link>
          <Link href="#reviews" className="text-sm font-medium text-navy hover:text-gold transition-colors">Patient Stories</Link>
          <Link href="#faq" className="text-sm font-medium text-navy hover:text-gold transition-colors">FAQ</Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a href="tel:02081234567" className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors">
            <Phone className="w-4 h-4" />
            020 8123 4567
          </a>
          <Button onClick={() => window.location.href = '/?booking=true'}>Book Consultation</Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-navy" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-4 flex flex-col gap-4 md:hidden">
          <Link href="#treatments" className="text-lg font-serif text-navy" onClick={() => setMobileMenuOpen(false)}>Treatments</Link>
          <Link href="#gallery" className="text-lg font-serif text-navy" onClick={() => setMobileMenuOpen(false)}>Smile Gallery</Link>
          <Link href="#reviews" className="text-lg font-serif text-navy" onClick={() => setMobileMenuOpen(false)}>Patient Stories</Link>
          <Link href="#faq" className="text-lg font-serif text-navy" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          <div className="pt-4 border-t border-charcoal-200 flex flex-col gap-4">
            <a href="tel:02081234567" className="flex items-center gap-2 text-lg text-navy">
              <Phone className="w-5 h-5" />
              020 8123 4567
            </a>
            <Button className="w-full" size="lg" onClick={() => {
              setMobileMenuOpen(false)
              window.location.href = '/?booking=true'
            }}>Book Consultation</Button>
          </div>
        </div>
      )}
    </header>
  )
}
