import assert from 'assert'
import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const { persist, restore } = makePersist<'availableOffline', boolean>('availableOffline')

const availableOfflineState = atom<boolean>({
  key: 'availableOffline',
  default: false,
  effects: [
    persist,
    restore,
    ({ onSet }) => {
      onSet(async (availableOffline) => {
        assert('serviceWorker' in navigator)

        if (availableOffline) {
          navigator.serviceWorker.register('./sw.js')
        } else {
          const registration = await navigator.serviceWorker.ready

          registration.unregister()
        }
      })
    }
  ],
})

export default availableOfflineState
