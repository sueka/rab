import { atom } from 'recoil'

import makePersist from '~/recoilEffects/makePersist'

const { persist, restore } = makePersist<'canGtmInstalledState', boolean>('canGtmInstalledState')

const canGtmInstalledState = atom({
  key: 'canGtmInstalledState',
  default: false,
  effects_UNSTABLE: [
    persist,
    restore,
  ],
})

export default canGtmInstalledState
