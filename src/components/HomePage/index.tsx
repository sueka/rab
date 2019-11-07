import React from 'react'
import { FormattedMessage,  FormattedNumber } from 'react-intl'

import Typography from '@material-ui/core/Typography'

import Today from '~/components/Today'
import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import SetClockButton from '~/components/SetClockButton'

import messages from './messages'

const HomePage: React.FunctionComponent = () => (
  <>
    <Typography>
      <FormattedMessage { ...messages.helloWorld } />
    </Typography>
    <Typography>
      <FormattedNumber format="usd" value={ 100 } />
    </Typography>
    <Today />
    <CurrentTimeOfDay />
    <SetClockButton />
  </>
)

export default HomePage
