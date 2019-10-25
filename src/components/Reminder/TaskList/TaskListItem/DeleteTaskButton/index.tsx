import React from 'react'
import { FormattedMessage } from 'react-intl'

import Button from '@material-ui/core/Button'

import messages from './messages'

export interface Props {
  onClick(): void
}

const TaskListItem: React.FunctionComponent<Props> = ({ onClick }) => (
  <Button onClick={ onClick } color="secondary">
    <FormattedMessage { ...messages.delete } />
  </Button>
)

export default TaskListItem
