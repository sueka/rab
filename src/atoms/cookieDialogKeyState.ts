import { atom } from 'recoil'
import { v4 } from 'uuid'

const cookieDialogKeyState = atom({
  key: 'cookieDialogKeyState',
  default: v4(),
})

export default cookieDialogKeyState
