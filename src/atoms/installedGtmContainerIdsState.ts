import { atom } from 'recoil'

const installedGtmContainerIdsState = atom<`GTM-${string}`[]>({
  key: 'installedGtmContainerIds',
  default: [],
})

export default installedGtmContainerIdsState
