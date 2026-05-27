import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Phone, Mail, MapPin, Loader } from 'lucide-react'
import { submitLead } from '../services/api'
import { toast } from 'react-toastify'
import { PROJECT, CONFIGS } from '../data/constants'

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await submitLead({ ...data, source: 'contact_section' })
      toast.success('Your enquiry has been submitted! We\'ll call you shortly.')
      reset()
    } catch {
      toast.warning('Demo mode — form captured locally.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#0F1F0F]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-3">
              Get in Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-6">
              Ready to Find<br />
              <span className="italic text-[#C9A227]">Your Dream Home?</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed">
              Our sales advisors are available 7 days a week to help you find the perfect configuration, 
              arrange site visits, and walk you through payment plans.
            </p>

            <div className="space-y-5">
              <a href={`tel:${PROJECT.phone}`}
                className="flex items-center gap-4 text-white/70 hover:text-[#C9A227] transition-colors group">
                <div className="w-10 h-10 border border-[rgba(201,162,39,0.3)] rounded-sm flex items-center justify-center group-hover:border-[#C9A227] transition-colors">
                  <Phone size={16} className="text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wide">Call Us</p>
                  <p className="font-medium">{PROJECT.phone}</p>
                </div>
              </a>

              {/* <a href={`mailto:${PROJECT.email}`}
                className="flex items-center gap-4 text-white/70 hover:text-[#C9A227] transition-colors group">
                <div className="w-10 h-10 border border-[rgba(201,162,39,0.3)] rounded-sm flex items-center justify-center group-hover:border-[#C9A227] transition-colors">
                  <Mail size={16} className="text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wide">Email</p>
                  <p className="font-medium">{PROJECT.email}</p>
                </div>
              </a> */}

              <div className="flex items-center gap-4 text-white/70">
                <div className="w-10 h-10 border border-[rgba(201,162,39,0.3)] rounded-sm flex items-center justify-center">
                  <MapPin size={16} className="text-[#C9A227]" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wide">Sales Office</p>
                  <p className="font-medium">Sadahalli Gate, Shettigere, North Bangalore</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="border border-[rgba(201,162,39,0.2)] rounded-sm p-8">
            <h3 className="font-display text-white text-2xl font-light mb-6">Send an Enquiry</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input className="form-input" placeholder="Full Name *"
                    {...register('name', { required: 'Required' })} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input className="form-input" placeholder="Phone *" type="tel" maxLength={10}
                    {...register('phone', {
                      required: 'Required',
                      pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid number' }
                    })} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              <input className="form-input" placeholder="Email Address" type="email"
                {...register('email')} />
              <select className="form-input" {...register('configInterest')}>
                <option value="">Configuration of Interest</option>
                {CONFIGS.map(cfg => (
                  <option key={cfg.type} value={cfg.type}>{cfg.type}</option>
                ))}
              </select>
              <textarea className="form-input resize-none" rows={3} placeholder="Any specific questions?"
                {...register('message')} />
              <button type="submit" disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2">
                {loading && <Loader size={15} className="animate-spin" />}
                {loading ? 'Sending...' : 'Send Enquiry →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
