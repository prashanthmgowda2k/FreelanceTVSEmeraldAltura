import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Configurations from './components/Configurations'
import Amenities from './components/Amenities'
import FloorPlans from './components/FloorPlans'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import LeadModal from './components/LeadModal'

export default function App() {
  // Modal state
  const [modal, setModal] = useState({
    open: false,
    source: 'general',
    title: 'Get Exclusive Details',
    subtitle: 'Fill in your details and our advisor will reach you shortly.',
    onSuccess: null,
  })

  /**
   * Central function to trigger lead gate before any action.
   * @param {string} source  - tracking source e.g. 'brochure_download'
   * @param {string} context - extra context e.g. config type
   * @param {function} callback - what to do after lead captured
   */
  const triggerLeadGate = (source, context = '', callback = null) => {
    const titles = {
      brochure_download: 'Download Brochure',
      floor_plan_view: `View ${context} Floor Plan`,
      gallery_view: 'View Full Gallery',
      configuration_card: `Enquire about ${context}`,
      site_visit: 'Schedule a Site Visit',
      general: 'Get Exclusive Details',
    }
    setModal({
      open: true,
      source,
      title: titles[source] || 'Get Exclusive Details',
      subtitle: source === 'brochure_download'
        ? 'Enter your details to download the complete project brochure.'
        : source === 'site_visit'
        ? 'Book your free site visit with a dedicated advisor.'
        : 'Fill in your details and our advisor will reach you shortly.',
      onSuccess: callback,
    })
  }

  const closeModal = () => setModal(m => ({ ...m, open: false }))

  const handleModalSuccess = (data) => {
    // Fire any callback set (e.g., open lightbox, trigger download)
    if (modal.onSuccess) modal.onSuccess(data)

    // Brochure download — opens a placeholder PDF
    if (modal.source === 'brochure_download') {
      // In production: replace with actual brochure URL from backend response
      window.open('https://www.w3.org/WAI/UR/wai-aria-practices/downloads/wai-aria-practices-1.1.pdf', '_blank')
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar onEnquire={() => triggerLeadGate('general')} />

      <main>
        <Hero />
        <StatsBar />
        <Configurations onEnquire={(src, ctx) => triggerLeadGate(src || 'configuration_card', ctx)} />
        <Amenities />
        <FloorPlans onGatedAction={triggerLeadGate} />
        <Gallery onGatedAction={triggerLeadGate} />
        <Location onEnquire={() => triggerLeadGate('site_visit')} />
        <Contact />
      </main>

      <Footer />
      <FloatingCTA onEnquire={() => triggerLeadGate('floating_cta')} />

      <LeadModal
        isOpen={modal.open}
        onClose={closeModal}
        onSuccess={handleModalSuccess}
        source={modal.source}
        title={modal.title}
        subtitle={modal.subtitle}
      />

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        theme="dark"
        toastStyle={{ background: '#1A2E1A', border: '1px solid rgba(201,162,39,0.3)', color: '#fff' }}
      />
    </div>
  )
}
