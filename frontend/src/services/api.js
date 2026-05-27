import axios from 'axios'

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
const baseURL = rawBaseUrl.endsWith('/api')
  ? rawBaseUrl
  : `${rawBaseUrl.replace(/\/+$/, '')}/api`

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Submit a lead before any gated action.
 * @param {object} data - { name, phone, email, source, utmSource, utmCampaign }
 */
export const submitLead = async (data) => {
  // Capture UTM params from URL automatically
  const params = new URLSearchParams(window.location.search)
  const payload = {
    ...data,
    utmSource: params.get('utm_source') || params.get('gad_source') || '',
    utmCampaign: params.get('utm_campaign') || params.get('gad_campaignid') || '',
    utmMedium: params.get('utm_medium') || '',
    gclid: params.get('gclid') || '',
    pageUrl: window.location.href,
  }
  const res = await api.post('/leads', payload)
  return res.data
}

/**
 * Download brochure — backend saves lead then streams PDF URL.
 */
export const downloadBrochure = async (data) => {
  const res = await submitLead({ ...data, source: 'brochure_download' })
  return res
}
