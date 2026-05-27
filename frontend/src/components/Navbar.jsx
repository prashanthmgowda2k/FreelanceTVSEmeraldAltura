import React, { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { PROJECT } from '../data/constants'

export default function Navbar({ onEnquire }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Configurations', href: '#configurations' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Floor Plans', href: '#floorplans' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-scrolled' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <div className="flex flex-col leading-tight">
          <span className="font-display text-white text-lg md:text-xl font-light tracking-wider">
            TVS <span className="text-gold-400">Emerald </span>
          </span>
          <span className="text-white/50 text-xs tracking-[0.2em] uppercase">Altura</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="text-white/70 hover:text-[#C9A227] text-sm transition-colors tracking-wide">
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${PROJECT.phone}`} className="flex items-center gap-2 text-[#C9A227] text-sm font-medium hover:text-[#E8C96A] transition-colors">
            <Phone size={15} />
            {PROJECT.phone}
          </a>
          <button onClick={onEnquire} className="btn-gold text-xs py-3 px-6">
            Enquire Now
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0F1F0F] border-t border-[rgba(201,162,39,0.2)] px-4 py-6 flex flex-col gap-5">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-white/80 text-base py-1 border-b border-white/5">
              {l.label}
            </a>
          ))}
          <button onClick={() => { setMenuOpen(false); onEnquire() }} className="btn-gold mt-2">
            Enquire Now
          </button>
          <a href={`tel:${PROJECT.phone}`} className="flex items-center justify-center gap-2 text-[#C9A227] text-sm">
            <Phone size={14} /> {PROJECT.phone}
          </a>
        </div>
      )}
    </header>
  )
}
