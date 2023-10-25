import { atom } from 'recoil'

interface GtmConsents {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
}

// TODO: Support region
const gtmConsentsState = atom<GtmConsents>({
  key: 'gtmConsentsState',
  default: {
    ad_storage: 'denied',
    analytics_storage: 'denied',
  },
})

export default gtmConsentsState
