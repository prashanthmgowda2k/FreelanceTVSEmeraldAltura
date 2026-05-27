import React from 'react'
import { Phone } from 'lucide-react'
import { PROJECT } from '../data/constants'

export default function FloatingCTA({ onEnquire }) {
  return (
    <div className="floating-cta">
      <a
        href={`tel:${PROJECT.phone}`}
        className="flex-1 bg-[#0F1F0F] text-[#C9A227] flex items-center justify-center gap-2 py-4 text-sm font-medium border-r border-[rgba(201,162,39,0.2)]"
      >
        <Phone size={16} /> Call Now
      </a>
      <button
        onClick={onEnquire}
        className="flex-1 bg-gradient-to-r from-[#C9A227] to-[#E8C96A] text-[#0F1F0F] flex items-center justify-center gap-2 py-4 text-sm font-semibold"
      >
        Enquire Now →
      </button>
    </div>
  )
}
