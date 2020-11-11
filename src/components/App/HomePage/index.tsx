import Typography from '@material-ui/core/Typography'
import React from 'react'
import Helmet from 'react-helmet'
import { FormattedMessage,  FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import GitHubAuthnButton from '~/components/GitHubAuthnButton'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.home) } />
      <Typography>
        <FormattedMessage { ...messages.helloWorld } />
      </Typography>
      <Typography>
        <FormattedNumber format="usd" value={ 100 } />
      </Typography>
      <Today />
      <CurrentTimeOfDay />
      <SetClockButton />
      <GitHubAuthnButton />
    </>
  )
}

export default createPage(HomePage)
