import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Phone, Mail, User, Loader } from 'lucide-react'
import { submitLead } from '../services/api'
import { toast } from 'react-toastify'

/**
 * LeadModal
 * Props:
 *   isOpen       – boolean
 *   onClose      – fn()
 *   onSuccess    – fn(leadData) called after successful submission
 *   source       – string identifier e.g. 'brochure_download'
 *   title        – modal heading
 *   subtitle     – modal sub-heading
 */
export default function LeadModal({ isOpen, onClose, onSuccess, source = 'enquiry', title = 'Get Exclusive Details', subtitle = 'Fill in your details and our advisor will reach you shortly.' }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const result = await submitLead({ ...data, source })
      toast.success('Thank you! Our team will contact you soon.')
      reset()
      onSuccess?.(result)
      onClose()
    } catch (err) {
      // If backend not running, still allow UI flow for dev
      console.error('Lead submission error:', err)
      toast.warning('Proceeding in demo mode (backend not connected)')
      onSuccess?.({ demo: true })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#0F1F0F] border border-[rgba(201,162,39,0.3)] rounded-sm w-full max-w-md relative overflow-hidden">
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#C9A227] via-[#E8C96A] to-[#C9A227]" />

        <div className="p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <p className="text-[#C9A227] text-xs tracking-[0.2em] uppercase font-medium mb-2">
              Nikoo Garden Estate
            </p>
            <h2 className="font-display text-white text-2xl font-light">{title}</h2>
            <p className="text-white/50 text-sm mt-2">{subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  className="form-input pl-10"
                  placeholder="Full Name *"
                  {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  className="form-input pl-10"
                  placeholder="Phone Number * (10 digits)"
                  type="tel"
                  maxLength={10}
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: { value: /^[6-9]\d{9}$/, message: 'Enter valid 10-digit Indian mobile number' }
                  })}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  className="form-input pl-10"
                  placeholder="Email Address (optional)"
                  type="email"
                  {...register('email', {
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter valid email' }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Config interest */}
            <div>
              <select
                className="form-input"
                {...register('configInterest')}
              >
                <option value="">Interested In (optional)</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="4BHK">4 BHK</option>
                <option value="Villa">Row Villa</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader size={16} className="animate-spin" /> : null}
              {loading ? 'Submitting...' : 'Get Details Now'}
            </button>

            <p className="text-white/25 text-xs text-center">
              By submitting, you agree to be contacted by our sales team.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
