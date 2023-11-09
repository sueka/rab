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
    ({ onSet, setSelf }) => {
      onSet(async (availableOffline) => {
        assert('serviceWorker' in navigator)

        if (availableOffline) {
          await navigator.serviceWorker.register('./sw.js').catch(reason => {
            console.error(reason)

            setSelf(false)
          })
        } else {
          const registration = await navigator.serviceWorker.ready

          registration.unregister()
        }
      })
    }
  ],
})

export default availableOfflineState