import React from 'react'
import { FormattedMessage,  FormattedNumber } from 'react-intl'

import Typography from '@material-ui/core/Typography'

import Nav from '~/components/Nav'
import Today from '~/containers/Today'

import messages from './messages'

const HomePage: React.FunctionComponent = () => (
  <>
    <Nav />
    <Typography>
      <FormattedMessage { ...messages.helloWorld } />
    </Typography>
    <Typography>
      <FormattedNumber format="usd" value={ 100 } />
    </Typography>
    <Today />
  </>
)

export default HomePage
