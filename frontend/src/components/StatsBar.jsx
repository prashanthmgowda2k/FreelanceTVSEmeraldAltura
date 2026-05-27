import React from 'react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { STATS } from '../data/constants'

export default function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} id="overview" className="bg-[#0F1F0F] py-14">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center border-r border-[rgba(201,162,39,0.15)] last:border-0">
              <div className="font-display text-4xl md:text-5xl text-[#C9A227] font-light">
                {inView ? (
                  <CountUp end={stat.value} duration={2} separator="," />
                ) : '0'}
                <span className="text-xl md:text-2xl">{stat.suffix}</span>
              </div>
              <p className="text-white/50 text-sm mt-2 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
