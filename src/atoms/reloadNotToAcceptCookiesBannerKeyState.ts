import { atom } from 'recoil'
import { v4 } from 'uuid'

const reloadNotToAcceptCookiesBannerKeyState = atom({
  key: 'reloadNotToAcceptCookiesBannerKeyState',
  default: v4(),
})

export default reloadNotToAcceptCookiesBannerKeyState
