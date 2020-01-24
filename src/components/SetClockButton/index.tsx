import React from 'react'
import { FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import { updateNow } from '~/redux/modules/io'
import messages from './messages'

interface DispatchProps {
  updateNow(): void
}

type Props =
  & DispatchProps

const SetClockButton: React.FunctionComponent<Props> = ({ updateNow }) => (
  <Button onClick={ updateNow }>
    <FormattedMessage { ...messages.setTheClock } />
  </Button>
)

// connect

const mapDispatchToProps: DispatchProps = {
  updateNow,
}

export default connect(null, mapDispatchToProps)(SetClockButton)
