import Typography from '@material-ui/core/Typography'
import { Temporal } from 'proposal-temporal'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { State } from '~/redux'
import { startClock, stopClock } from '~/redux/modules/io'
import StoppedClock from './StoppedClock'

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

const { timeZone } = new Intl.DateTimeFormat().resolvedOptions()

const AnalogClock: React.FC<Props> = ({ now, startClock, stopClock }) => {
  useEffect(() => {
    startClock()

    return stopClock
  }, [startClock, stopClock])

  return (
    <Typography>
      <StoppedClock
        time={
          // NOTE: locale は時刻の書式が hh:mm:ss なロケールなら何でもよいが、 Firefox 85 では new Date(0).toLocaleString('ja', { hour: '2-digit', minute: '2-digit' }) が "9:00" となる。
          Temporal.PlainTime.from(now.toLocaleTimeString('en', {
            calendar: 'gregory',
            numberingSystem: 'latn',
            timeZone,
            hourCycle: 'h23',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }))
        }
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(AnalogClock)
