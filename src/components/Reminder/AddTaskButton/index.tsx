import Button from '@mui/material/Button'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

export interface Props {
  addTask(): void
}

const AddTaskButton: React.FC<Props> = ({ addTask }) => (
  <Button onClick={ addTask } variant="contained" color="secondary">
    <FormattedMessage { ...messages.add } />
  </Button>
)

export default AddTaskButton
