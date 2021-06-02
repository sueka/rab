import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import FormattedTimeOfDay from '~/components/FormattedTimeOfDay'
import { State } from '~/redux'
import { startClock, stopClock } from '~/redux/modules/io'

interface StateProps {
  now: Date
}

interface DispatchProps {
  startClock(): void
  stopClock(): void
}

type Props =
  & StateProps
  & DispatchProps

const Clock: React.FC<Props> = ({ now, startClock, stopClock }) => {
  useEffect(() => {
    startClock()

    return stopClock
  }, [startClock, stopClock])

  return (
    <Typography>
      <FormattedTimeOfDay value={ now } format="medium" />
    </Typography>
  )
}

// connect

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

const mapDispatchToProps: DispatchProps = {
  startClock,
  stopClock,
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
