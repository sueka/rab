import React from 'react'

import Typography from '@material-ui/core/Typography'

import delay from '~/lib/delay'
import FormattedTimeOfDay from '~/components/FormattedTimeOfDay'

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
  React.useEffect(() => {
    let mounted = true;

    (async () => {
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
