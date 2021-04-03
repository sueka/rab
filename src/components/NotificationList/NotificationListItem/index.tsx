import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
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
        <IconButton edge="end" onClick={ handleDeleteButtonClick }>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default NotificationListItem
