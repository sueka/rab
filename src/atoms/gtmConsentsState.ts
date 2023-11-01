import { atom } from 'recoil'

import gtag from '~/helpers/google/gtag'
import makePersist from '~/recoilEffects/makePersist'

export interface GtmConsents extends SerializableObject {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
}

const { persist, restore } = makePersist<'gtmConsents', GtmConsents>('gtmConsents')

// TODO: Support region
const gtmConsentsState = atom<GtmConsents>({
  key: 'gtmConsents',
  default: {},
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newGtmConsents) => {
        // NOTE: gtag('consent', 'update') は、順序を制御するため、ここでしか行わない。
        gtag('consent', 'update', newGtmConsents)
      })
    },
    persist,
    restore,
  ],
})

export default gtmConsentsState
