import FaviconNotification from 'favicon-notification'
import { atom } from 'recoil'
import { v4 } from 'uuid'

const notificationsState = atom<Notification[]>({
  key: v4(),
  default: [],
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newNotifications => {
        if (!Array.isArray(newNotifications)) {
          throw new Error
        }

        if (newNotifications.length !== 0) {
          FaviconNotification.add()
        } else {
          FaviconNotification.remove()
        }
      })
    },
  ],
})

export default notificationsState
