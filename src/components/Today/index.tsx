import React from 'react'
import { FormattedDate } from 'react-intl'
import { connect } from 'react-redux'

import { State } from '~/redux'

interface StateProps {
  now: Date
}

type Props =
  & StateProps

// TODO: delete?
const Today: React.FC<Props> = ({ now }) => (
  <FormattedDate value={ now } format="medium" />
)

// connect

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

export default connect(mapStateToProps)(Today)
