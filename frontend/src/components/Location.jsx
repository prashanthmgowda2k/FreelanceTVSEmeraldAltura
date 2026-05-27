import React from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { LOCATION_POINTS } from '../data/constants'

export default function Location({ onEnquire }) {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Prime Location
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-[#0F1F0F] font-light section-title mb-8">
              Thanisandra,<br/> Bagaluru cross,<br />North Bangalore
            </h2>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Strategically located at Sathanur, just minutes from Thanisandra and Bagalur Cross, 
              TVS Emerald Altura sits at the convergence of North Bengaluru’s fastest-evolving growth corridor
               — seamlessly connecting Kempegowda International Airport, KIADB Aerospace Park, Manyata Tech Park, and the upcoming Bagalur Cross Metro line.
            </p>

            <div className="space-y-4">
              {LOCATION_POINTS.map((pt, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-sm hover:border-[#C9A227]/30 transition-colors">
                  <div className="bg-[#0F1F0F] text-[#C9A227] rounded-sm px-3 py-2 text-sm font-semibold min-w-[72px] text-center">
                    {pt.dist}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Navigation size={14} className="text-[#C9A227] shrink-0" />
                    {pt.place}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onEnquire} className="btn-gold mt-8 inline-flex items-center gap-2">
              <MapPin size={15} /> Schedule Site Visit
            </button>
          </div>

          {/* Right — Embedded Google Map (static fallback with iframe) */}
          <div className="rounded-sm overflow-hidden border border-gray-200 h-[420px] relative">
            <iframe
              title="Thanisandra, Bengaluru Location"
              src="https://maps.google.com/maps?q=13.0559193,77.6324513&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map overlay label */}
            <div className="absolute top-4 left-4 bg-[#0F1F0F] text-white px-4 py-2 text-sm flex items-center gap-2 rounded-sm">
              <MapPin size={14} className="text-[#C9A227]" />
              Thanisandra, Bengaluru
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
