import React from 'react'
import { FormattedDate } from 'react-intl'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography'

import { State } from '~/redux'

interface StateProps {
  now: Date
}

type Props =
  & StateProps

const Today: React.FC<Props> = ({ now }) => (
  <Typography>
    <FormattedDate value={ now } format="medium" />
  </Typography>
)

// connect

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

export default connect(mapStateToProps)(Today)
