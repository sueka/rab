import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'

export interface Props {
  onClick(): void
}

const DeleteTaskButton: React.FC<Props> = ({ onClick }) => (
  <IconButton onClick={ onClick }>
    <DeleteIcon />
  </IconButton>
)

export default DeleteTaskButton
