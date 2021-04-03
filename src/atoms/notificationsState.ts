import { atom } from 'recoil'

const notificationsState = atom<Notification[]>({
  key: 'notificationsState',
  default: [],
})

export default notificationsState
