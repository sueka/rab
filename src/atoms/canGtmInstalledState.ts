import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const { persist, restore } = makePersist<'canGtmInstalled', boolean>('canGtmInstalled')

const canGtmInstalledState = atom({
  key: 'canGtmInstalled',
  default: false,
  effects_UNSTABLE: [
    persist,
    restore,
  ],
})

export default canGtmInstalledState
