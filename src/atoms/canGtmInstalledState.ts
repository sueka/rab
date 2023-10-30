import { atom } from 'recoil'

import persist from '~/recoilEffects/makePersist'

const canGtmInstalledState = atom({
  key: 'canGtmInstalledState',
  default: false,
  effects_UNSTABLE: [
    persist,
  ],
})

export default canGtmInstalledState
