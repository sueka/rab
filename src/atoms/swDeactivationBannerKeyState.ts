import { atom } from 'recoil'

const swDeactivationBannerKeyState = atom<string | null>({
  key: 'swDeactivationBannerKey',
  default: null, //
})

export default swDeactivationBannerKeyState
