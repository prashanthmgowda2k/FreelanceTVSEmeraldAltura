import React, { useState } from 'react'
import { X } from 'lucide-react'
import { GALLERY } from '../data/constants'

export default function Gallery({ onGatedAction }) {
  const [lightbox, setLightbox] = useState(null)

  const handleImageClick = (img) => {
    // Gated: require lead before full lightbox
    onGatedAction('gallery_view', img.alt, () => setLightbox(img))
  }

  return (
    <section id="gallery" className="py-20 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#C9A227] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Photo Gallery
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#0F1F0F] font-light section-title center">
            See It to Believe It
          </h2>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-sm cursor-pointer group
                ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              onClick={() => handleImageClick(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? 'h-64 md:h-96' : 'h-48'}`}
              />
              <div className="absolute inset-0 bg-[#0F1F0F]/0 group-hover:bg-[#0F1F0F]/40 transition-all duration-300 flex items-center justify-center">
                <p className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium tracking-wide transition-opacity duration-300">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-sm" />
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
