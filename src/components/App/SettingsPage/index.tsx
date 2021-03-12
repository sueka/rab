import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const SettingsPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <Helmet title={ formatMessage(messages.settings) } />
  )
}

export default createPage(SettingsPage)
