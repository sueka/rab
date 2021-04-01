import { atom } from 'recoil'
import { v4 } from 'uuid'

const notificationsState = atom<Notification[]>({
  key: v4(),
  default: [],
})

export default notificationsState
