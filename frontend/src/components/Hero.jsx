import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader, Phone } from 'lucide-react'
import { submitLead } from '../services/api'
import { toast } from 'react-toastify'
import { PROJECT } from '../data/constants'

export default function Hero() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await submitLead({ ...data, source: 'hero_form' })
      toast.success('Thank you! Our advisor will call you shortly.')
      reset()
    } catch {
      toast.warning('Demo mode — form captured locally.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background — free Unsplash luxury apartment video still */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
          alt="TVS Emerald Altura"
          className="w-full h-full object-cover"
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F0F]/90 via-[#0F1F0F]/70 to-[#0F1F0F]/30" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-16 md:py-0">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-4">
              Thanisandra, Bagaluru cross, North Bangalore
            </p>
            <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-light mb-4">
              Where Luxury<br />
              <span className="text-gold-gradient italic">Meets Nature</span>
            </h1>
            <p className="text-white/60 text-lg mt-6 mb-8 max-w-lg leading-relaxed">
              10.06 acres of curated living with 975 premium residences, a 29,000 sq.ft clubhouse,
              and seamless connectivity to the airport & tech parks.
            </p>

            {/* Pill badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['2, 3 & 4 BHK', 'Starting ₹1.2Cr*', 'RERA Approved'].map(badge => (
                <span key={badge} className="border border-[rgba(201,162,39,0.4)] text-[#C9A227] text-xs px-4 py-2 rounded-full tracking-wide">
                  {badge}
                </span>
              ))}
            </div>

            <a href={`tel:${PROJECT.phone}`}
              className="inline-flex items-center gap-2 text-white bg-transparent border border-white/20 px-6 py-3 rounded-sm hover:border-[#C9A227] hover:text-[#C9A227] transition-all text-sm">
              <Phone size={15} /> Call Now: {PROJECT.phone}
            </a>
          </div>

          {/* Right — lead form card */}
          <div className="bg-[#0F1F0F]/80 backdrop-blur-md border border-[rgba(201,162,39,0.25)] rounded-sm p-8">
            <div className="h-0.5 w-12 bg-gradient-to-r from-[#C9A227] to-transparent mb-6" />
            <h2 className="font-display text-white text-2xl font-light mb-1">Get a Callback</h2>
            <p className="text-white/40 text-sm mb-6">Our advisor will reach you within 30 minutes.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input className="form-input" placeholder="Your Full Name *"
                  {...register('name', { required: 'Required' })} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input className="form-input" placeholder="Mobile Number *" type="tel" maxLength={10}
                  {...register('phone', {
                    required: 'Required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid mobile number' }
                  })} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <input className="form-input" placeholder="Email Address (optional)" type="email"
                  {...register('email')} />
              </div>
              <select className="form-input" {...register('configInterest')}>
                <option value="">Select Configuration</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4 BHK</option>
                {/* <option>Row Villa</option> */}
              </select>

              <button type="submit" disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2">
                {loading && <Loader size={15} className="animate-spin" />}
                {loading ? 'Submitting...' : 'Request a Callback →'}
              </button>
            </form>

            <p className="text-white/20 text-xs mt-4 text-center">
              RERA: {PROJECT.reraId}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
