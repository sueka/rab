import { atom } from 'recoil'

const darkState = atom<boolean | null>({
  key: 'darkState',
  default: null,
})

export default darkState
