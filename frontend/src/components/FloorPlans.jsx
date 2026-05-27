import React, { useState } from 'react'
import { Download, Eye } from 'lucide-react'
import { FLOOR_PLANS } from '../data/constants'

export default function FloorPlans({ onGatedAction }) {
  const [active, setActive] = useState(0)

  return (
    <section id="floorplans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Floor Plans
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#0F1F0F] font-light section-title">
            Thoughtful Layouts
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl">
            Every room is designed to maximise natural light, ventilation, and functional space.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tab selector */}
          <div className="flex lg:flex-col gap-3">
            {FLOOR_PLANS.map((fp, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left p-5 border rounded-sm transition-all duration-200
                  ${active === i
                    ? 'border-[#C9A227] bg-[#0F1F0F] text-white'
                    : 'border-gray-200 hover:border-[#C9A227]/50'}`}
              >
                <p className={`font-semibold text-lg ${active === i ? 'text-[#C9A227]' : 'text-[#0F1F0F]'}`}>
                  {fp.type}
                </p>
                <p className={`text-sm mt-1 ${active === i ? 'text-white/60' : 'text-gray-400'}`}>
                  {fp.area}
                </p>
              </button>
            ))}
          </div>

          {/* Floor plan image */}
          <div className="lg:col-span-2 relative">
            <div className="relative overflow-hidden rounded-sm border border-gray-100 bg-gray-50 aspect-[4/3] flex items-center justify-center">
              <img
                src={FLOOR_PLANS[active].img}
                alt={`${FLOOR_PLANS[active].type} Floor Plan`}
                className="w-full h-full object-cover"
              />
              {/* Blur overlay with prompt */}
              <div className="absolute inset-0 bg-[#0F1F0F]/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <p className="text-white/80 text-sm font-medium text-center px-8">
                  Submit your details to view detailed floor plans
                </p>
                <button
                  onClick={() => onGatedAction('floor_plan_view', FLOOR_PLANS[active].type)}
                  className="flex items-center gap-2 btn-gold"
                >
                  <Eye size={16} /> View Floor Plan
                </button>
              </div>
            </div>

            {/* Download brochure */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onGatedAction('brochure_download')}
                className="flex items-center gap-2 btn-outline-gold"
              >
                <Download size={16} /> Download Full Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
