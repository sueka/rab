import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const canGtmInstalledState = atom({
  key: 'canGtmInstalledState',
  default: false,
  effects_UNSTABLE: [
    makePersist('canGtmInstalledState'),
  ],
})

export default canGtmInstalledState
