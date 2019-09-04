import React from 'react'
import { FormattedMessage } from 'react-intl'

import Button from '@material-ui/core/Button'

import messages from './messages'

export interface Props {
  addTask(): void
}

const AddTaskButton: React.FunctionComponent<Props> = ({ addTask }) => (
  <Button onClick={ addTask }>
    <FormattedMessage { ...messages.add } />
  </Button>
)

export default AddTaskButton
