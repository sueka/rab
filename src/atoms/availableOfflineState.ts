import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const { persist, restore } = makePersist('availableOffline')

const availableOfflineState = atom({
  key: 'availableOffline',
  default: false,
  effects: [
    persist,
    restore,
  ],
})

export default availableOfflineState
