import List from '@mui/material/List'
import React from 'react'
import { useRecoilValue } from 'recoil'

import sortedNotificationsState from '~/selectors/sortedNotificationsState'
import NotificationListItem from './NotificationListItem'

const NotificationList: React.FC = () => {
  const notifications = useRecoilValue(sortedNotificationsState)

  return (
    <List>
      { notifications.map((n) => (
        <NotificationListItem key={ n.timestamp } notification={ n } />
      )) }
    </List>
  )
}

export default NotificationList
