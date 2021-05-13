import { atom } from 'recoil'

type NotificationsSort = Sort<Notification>

const notificationsSortState = atom<NotificationsSort>({
  key: 'notificationsSortState',
  default: {
    by: 'timestamp',
    in: 'descending',
  },
})

export default notificationsSortState
