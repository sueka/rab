import { atom } from 'recoil'

const bannerOpenState = atom({
  key: 'bannerOpen',
  default: false,
})

export default bannerOpenState
