import React from 'react'
import { FormattedMessage} from 'react-intl'

import Button from '@material-ui/core/Button'

import messages from './messages'

export interface DispatchProps {
  updateNow(): void
}

type Props =
  | DispatchProps

const SetClockButton: React.FunctionComponent<Props> = ({ updateNow }) => (
  <Button onClick={ updateNow }>
    <FormattedMessage { ...messages.setTheClock } />
  </Button>
)

export default SetClockButton
