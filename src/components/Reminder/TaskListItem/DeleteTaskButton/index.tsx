import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

export interface Props {
  onClick(): void
}

const TaskListItem: React.FunctionComponent<Props> = ({ onClick }) => (
  <IconButton onClick={ onClick }>
    <DeleteIcon />
  </IconButton>
)

export default TaskListItem
