import { selector } from 'recoil'

import notificationsSortState from '~/atoms/notificationsSortState'
import notificationsState from '~/atoms/notificationsState'

const sortedNotificationsState = selector({
  key: 'sortedNotificationsState',
  get({ get }) {
    const notifications = get(notificationsState)
    const sort = get(notificationsSortState)

    const sorted = notifications.map(notification => ({
      notification,
      by: notification[sort.by],
    }))
    .sort(({ by: a }, { by: b }) => a - b) // tslint:disable-line:no-array-mutation
    .map(({ notification }) => notification)

    if (sort.in === 'desc') {
      sorted.reverse() // tslint:disable-line:no-array-mutation
    }

    return sorted
  },
})

export default sortedNotificationsState
