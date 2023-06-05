import Button from '@mui/material/Button'
import React from 'react'
import { FormattedMessage} from 'react-intl'
import { connect } from 'react-redux'

import { updateNow } from '~/redux/modules/io'
import messages from './messages'

interface DispatchProps {
  updateNow(): void
}

type Props =
  & DispatchProps

// TODO: delete
const SetClockButton: React.FC<Props> = ({ updateNow }) => (
  <Button onClick={ updateNow }>
    <FormattedMessage { ...messages.setTheClock } />
  </Button>
)

// connect

const mapDispatchToProps: DispatchProps = {
  updateNow,
}

export default connect(null, mapDispatchToProps)(SetClockButton)
