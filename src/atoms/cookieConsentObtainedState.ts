import { atom } from 'recoil'

import UnreachableError from '~/lib/errors/UnreachableError'

const KEY = 'cookieConsentObtained'

const cookieConsentObtainedState = atom({
  key: 'cookieConsentObtainedState',
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
      onSet((cookieConsentObtained) => {
        localStorage.setItem(KEY, cookieConsentObtained ? '0' : '1')
      })
    },
  ],
})

export default cookieConsentObtainedState
