import React from 'react'
import { FormattedMessage,  FormattedNumber } from 'react-intl'

import Typography from '@material-ui/core/Typography'

import Today from '~/containers/Today'
import CurrentTimeOfDay from '~/containers/CurrentTimeOfDay'

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
  </>
)

export default HomePage
