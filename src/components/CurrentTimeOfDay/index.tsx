import React from 'react'

import Typography from '@material-ui/core/Typography'

import FormattedTimeOfDay from '~/components/FormattedTimeOfDay'

export interface StateProps {
  now: Date
}

type Props =
  & StateProps

const CurrentTimeOfDay: React.FunctionComponent<Props> = ({ now }) => (
  <Typography>
    <FormattedTimeOfDay value={ now } format="medium" />
  </Typography>
)

export default CurrentTimeOfDay
