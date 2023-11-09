import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const { persist, restore } = makePersist<'availableOffline', boolean>('availableOffline')

const availableOfflineState = atom<boolean>({
  key: 'availableOffline',
  default: false,
  effects: [
    persist,
    restore,
  ],
})

export default availableOfflineState
