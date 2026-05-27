import React from 'react'
import { PROJECT } from '../data/constants'

export default function Footer() {
  return (
    <footer className="bg-[#060E06] text-white/40 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <div className="font-display text-white text-xl mb-2">
              TVS <span className="text-[#C9A227]">Emerald </span>Altura
            </div>
            <p className="text-white/30 text-xs"> Thanisandra, Bagaluru cross, North Bangalore</p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-xs">RERA Registration</p>
            <p className="text-[#C9A227] text-xs font-mono mt-1">{PROJECT.reraId}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="leading-relaxed text-[11px]">
            <strong className="text-white/60">Disclaimer:</strong> The content on this website is for informational and marketing purposes only. 
            All dimensions, specifications, prices, floor plans, and amenities are subject to change without prior notice. 
            Images shown are for representation purposes only. This is not a legal document. 
            Buyers are advised to verify all details independently before making any purchase decision. 
            *Prices are indicative and inclusive of GST as applicable. Terms & Conditions apply.
          </p>
          <p className="mt-4 text-center text-[11px]">© 2026 TVS Emerald Developers. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
