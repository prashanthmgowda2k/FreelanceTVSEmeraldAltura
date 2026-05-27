import React from 'react'
import { useInView } from 'react-intersection-observer'
import { CONFIGS } from '../data/constants'

export default function Configurations({ onEnquire }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="configurations" className="py-20 bg-[#FAFAF7]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Apartment Configurations
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#0F1F0F] font-light section-title center">
            Choose Your Home
          </h2>
          <p className="text-gray-500 mt-6 max-w-xl mx-auto">
            Thoughtfully designed residences that blend contemporary architecture with functional living spaces.
          </p>
        </div>

        {/* Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {CONFIGS.map((c, i) => (
            <div key={i} className="config-card bg-white rounded-sm overflow-hidden transition-all duration-300">
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img src={c.img} alt={c.type} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-[#0F1F0F] text-[#C9A227] text-xs px-3 py-1 font-medium tracking-wide">
                  {c.type}
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Area</span>
                    <span className="text-gray-700 font-medium">{c.area}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Height</span>
                    <span className="text-gray-700 font-medium">{c.floors}</span>
                  </div>
                  <div className="h-px bg-gray-100 my-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Price</span>
                    <span className="text-[#0F1F0F] font-semibold text-base">{c.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => onEnquire('configuration_card', c.type)}
                  className="btn-outline-gold w-full text-xs"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
