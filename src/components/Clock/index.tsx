import React, { useEffect } from 'react'

import Typography from '@material-ui/core/Typography'

import delay from '~/lib/delay'
import FormattedTimeOfDay from '~/lib/components/FormattedTimeOfDay'

export interface StateProps {
  now: Date
}

export interface DispatchProps {
  updateNow(): void
}

type Props =
  & StateProps
  & DispatchProps

const Clock: React.FunctionComponent<Props> = ({ now, updateNow }) => {
  useEffect(() => {
    let mounted = true; // tslint:disable-line:no-let

    (async () => {
      // tslint:disable-next-line:no-loop-statement
      while (mounted) {
        await delay(1000 - new Date().getMilliseconds())

        updateNow()
      }
    })()

    return () => {
      mounted = false
    }
  }, [updateNow])

  return (
    <Typography>
      <FormattedTimeOfDay value={ now } format="medium" />
    </Typography>
  )
}

export default Clock
