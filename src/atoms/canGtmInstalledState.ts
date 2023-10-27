import { atom } from 'recoil'

import UnreachableError from '~/errors/UnreachableError'

const KEY = 'canGtmInstalled'

const canGtmInstalledState = atom({
  key: 'canGtmInstalledState',
  default: false,
  effects_UNSTABLE: [
    ({ trigger, setSelf }) => {
      if (trigger === 'get') {
        switch (localStorage.getItem(KEY)) {
          case '0':
            setSelf(true)
            break
          case '1':
            setSelf(false)
            break
          case null: break
          default: throw new UnreachableError
        }
      }
    },
    ({ onSet }) => {
      onSet((canGtmInstalled) => {
        localStorage.setItem(KEY, canGtmInstalled ? '0' : '1')
      })
    },
  ],
})

export default canGtmInstalledState
