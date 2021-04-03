import IconButton from '@material-ui/core/IconButton'
import AddAlertIcon from '@material-ui/icons/AddAlert'
import FaviconNotification from 'favicon-notification'
import React, { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import notificationsState from '~/atoms/notificationsState'
import useOnceForEachEffect from '~/lib/hooks/useOnceForEachEffect'
import Notification from '~/lib/polyfills/Notification'

interface Props {
  inputFor: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
}

const NotifyMeButton: React.FC<Props> = ({ inputFor: ref }) => {
  const [notifications, setNotifications] = useRecoilState(notificationsState)

  const handleNotifyButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    const input = ref.current

    if (input === null || /^\p{White_Space}*$/.test(input.value)) {
      return
    }

    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      setNotifications((ns) => [...ns, new Notification(input.value)])
    }
  }, [ref])

  const handleNotificationClose = useCallback<NonNullable<Notification['onclose']>>((event) => {
    const notification = event.target

    if (!(notification instanceof Notification)) {
      return
    }

    setNotifications((ns) => ns.filter((n) => n !== notification))
  }, [])

  useEffect(() => {
    if (notifications.length !== 0) {
      FaviconNotification.add()
    } else {
      FaviconNotification.remove()
    }
  }, [notifications])

  useOnceForEachEffect(notifications, undefined, (notification) => {
    notification.addEventListener('close', handleNotificationClose)

    return () => {
      notification.removeEventListener('close', handleNotificationClose)
    }
  }, [notifications, handleNotificationClose])

  if (!('Notification' in globalThis)) {
    return null
  }

  return (
    <IconButton onClick={ handleNotifyButtonClick }>
      <AddAlertIcon />
    </IconButton>
  )
}

export default NotifyMeButton
