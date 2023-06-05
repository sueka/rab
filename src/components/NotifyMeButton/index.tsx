import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import SendIcon from '@mui/icons-material/Send'
import React, { useCallback, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import { shouldBePresent } from '~/asserters/commonAsserters'

import notificationsState from '~/atoms/notificationsState'
import useOnceForEachEffect from '~/hooks/useOnceForEachEffect'
import messages from './messages'

interface Props {
  inputFor: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
}

const NotifyMeButton: React.FC<Props> = ({ inputFor: ref }) => {
  const [notifications, setNotifications] = useRecoilState(notificationsState)
  const value = ref.current?.value
  const disabled = useMemo(() => value === undefined || /^\p{White_Space}*$/u.test(value), [value])

  const handleNotifyButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
    if (ref.current === null) {
      return
    }

    shouldBePresent(value)

    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      setNotifications((ns) => [...ns, new Notification(value)])
    }
  }, [ref, value, setNotifications])

  const handleNotificationClose = useCallback<NonNullable<Notification['onclose']>>((event) => {
    const notification = event.target

    if (!(notification instanceof Notification)) {
      return
    }

    setNotifications((ns) => ns.filter((n) => n !== notification))
  }, [setNotifications])

  useOnceForEachEffect(notifications, undefined, (notification) => {
    notification.addEventListener('close', handleNotificationClose)
  }, [notifications, handleNotificationClose])

  if (!('Notification' in globalThis)) {
    return null
  }

  return (
    <Tooltip
      title={ <FormattedMessage { ...messages.sendPushNotification } /> }
      disableFocusListener={ disabled }
      disableHoverListener={ disabled }
      disableTouchListener={ disabled }
    >
      <span>
        <IconButton
          onClick={ handleNotifyButtonClick }
          disabled={ disabled }
          size="large"
        >
          <SendIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default NotifyMeButton
