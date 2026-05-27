import React from 'react'
import { useInView } from 'react-intersection-observer'
import { AMENITIES } from '../data/constants'

export default function Amenities() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="amenities" className="py-20 bg-[#0F1F0F] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            World-Class Amenities
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light section-title center">
            Life at Its Best
          </h2>
          <p className="text-white/40 mt-6 max-w-xl mx-auto">
            A 29,000 sq.ft clubhouse housing every premium amenity imaginable, surrounded by lush green spaces.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {AMENITIES.map((a, i) => (
            <div
              key={i}
              className={`amenity-card bg-white/5 border border-white/10 rounded-sm p-5 text-center transition-all duration-500 cursor-default
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl mb-3">{a.icon}</div>
              <p className="text-white/70 text-xs tracking-wide">{a.label}</p>
            </div>
          ))}
        </div>

        {/* Clubhouse callout */}
        <div className="mt-14 border border-[rgba(201,162,39,0.3)] rounded-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase mb-2">Featured Amenity</p>
            <h3 className="font-display text-white text-3xl font-light">
              29,000 sq.ft <span className="italic text-[#C9A227]">Clubhouse</span>
            </h3>
            <p className="text-white/40 mt-2 max-w-md">
              Bangalore's largest private clubhouse in a residential community, featuring a banquet hall, theatre, spa, sports courts, and more.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80"
            alt="Clubhouse"
            className="w-full md:w-64 h-40 object-cover rounded-sm"
          />
        </div>
      </div>
    </section>
  )
}
