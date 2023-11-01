import { atom } from 'recoil'

type NotificationsSort = Sort<Notification>

const notificationsSortState = atom<NotificationsSort>({
  key: 'notificationsSort',
  default: {
    by: 'timestamp',
    in: 'desc',
  },
})

export default notificationsSortState
