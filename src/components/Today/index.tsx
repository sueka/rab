import * as React from 'react'
import { FormattedDate } from 'react-intl'

import Typography from '@material-ui/core/Typography'

export interface StateProps {
  now: Date
}

type Props =
  & StateProps

const Today: React.FunctionComponent<Props> = ({ now }) => (
  <Typography>
    <FormattedDate format="medium" value={ now } />
  </Typography>
)

export default Today
