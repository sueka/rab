import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useCallback } from 'react'
import { FormattedTime } from 'react-intl'

interface Props {
  notification: Notification
}

const NotificationListItem: React.FC<Props> = ({ notification }) => {
  const handleDeleteButtonClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(() => {
    notification.close()
  }, [notification])

  return (
    <ListItem>
      <ListItemText
        primary={ notification.title }
        secondary={ <FormattedTime value={ notification.timestamp } format="medium" /> }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={ handleDeleteButtonClick } size="large">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NotificationListItem
