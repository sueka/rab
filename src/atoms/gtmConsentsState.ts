import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import gtag from '~/helpers/google/gtag'

interface GtmConsents {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
}

const { persistAtom } = recoilPersist()

// TODO: Support region
const gtmConsentsState = atom<GtmConsents>({
  key: 'gtmConsentsState',
  default: {
    ad_storage: 'denied',
    analytics_storage: 'denied',
  },
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newGtmConsents) => {
        gtag('consent', 'update', newGtmConsents)
      })
    },
    persistAtom,
  ],
})

export default gtmConsentsState
