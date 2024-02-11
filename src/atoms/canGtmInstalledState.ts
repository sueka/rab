import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const { persist, restore } = makePersist<boolean>('canGtmInstalled')

const canGtmInstalledState = atom({
  key: 'canGtmInstalled',
  default: false,
  effects_UNSTABLE: [
    persist,
    restore,
  ],
})

export default canGtmInstalledState
