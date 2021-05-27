import { atom } from 'recoil'

const bannerOpenState = atom({
  key: 'bannerOpenState',
  default: false,
})

export default bannerOpenState
