import { atom } from 'recoil'
import { v4 } from 'uuid'

const darkState = atom<boolean | null>({
  key: v4(),
  default: null,
})

export default darkState
