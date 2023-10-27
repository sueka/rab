import { atom } from 'recoil'

import gtag from '~/helpers/google/gtag'
import persist from '~/recoilEffects/persist'

export interface GtmConsents extends SerializableObject {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
}

// TODO: Support region
const gtmConsentsState = atom<GtmConsents>({
  key: 'gtmConsentsState',
  default: {},
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newGtmConsents) => {
        gtag('consent', 'update', newGtmConsents)
      })
    },
    persist,
  ],
})

export default gtmConsentsState
