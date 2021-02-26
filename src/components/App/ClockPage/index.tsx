import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import AnalogClock from '~/components/AnalogClock'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const ClockPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.clock) } />
      <AnalogClock />
    </>
  )
}

export default createPage(ClockPage)
