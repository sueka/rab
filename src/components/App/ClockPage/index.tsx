import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Clock from '~/components/Clock'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const ClockPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.clock) } />
      <Clock />
    </>
  )
}

export default createPage(ClockPage)
