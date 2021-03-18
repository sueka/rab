import Typography from '@material-ui/core/Typography'
import React from 'react'
import Helmet from 'react-helmet'
import { FormattedNumber, useIntl } from 'react-intl'

import CurrentTimeOfDay from '~/components/CurrentTimeOfDay'
import { createPage } from '~/components/PageTemplate'
import SetClockButton from '~/components/SetClockButton'
import Today from '~/components/Today'
import messages from './messages'

const HomePage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.home) } />
      <Typography>
        <FormattedNumber format="usd" value={ 100 } />
      </Typography>
      <Typography>
        <Today /> <CurrentTimeOfDay />
      </Typography>
      <SetClockButton />
    </>
  )
}

export default createPage(HomePage)
