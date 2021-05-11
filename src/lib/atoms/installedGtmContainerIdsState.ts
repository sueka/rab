import { atom } from 'recoil'

const installedGtmContainerIdsState = atom<`GTM-${string}`[]>({
  key: 'installedGtmContainerIdsState',
  default: [],
})

export default installedGtmContainerIdsState
