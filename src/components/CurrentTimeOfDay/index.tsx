import React from 'react'
import { connect } from 'react-redux'

import FormattedTimeOfDay from '~/lib/components/FormattedTimeOfDay'
import { State } from '~/redux'

interface StateProps {
  now: Date
}

type Props =
  & StateProps

// TODO: delete?
const CurrentTimeOfDay: React.FC<Props> = ({ now }) => (
  <FormattedTimeOfDay value={ now } format="medium" />
)

// connect

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

export default connect(mapStateToProps)(CurrentTimeOfDay)
