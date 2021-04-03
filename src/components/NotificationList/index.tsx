import List from '@material-ui/core/List'
import React from 'react'
import { useRecoilState } from 'recoil'

import notificationsState from '~/atoms/notificationsState'
import NotificationListItem from './NotificationListItem'

const NotificationList: React.FC = () => {
  const [notifications] = useRecoilState(notificationsState)

  return (
    <List>
      { notifications.map((n) => (
        <NotificationListItem key={ n.timestamp } notification={ n } />
      )) }
    </List>
  )
}

export default NotificationList
