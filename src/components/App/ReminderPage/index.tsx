import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Reminder from '~/components/Reminder'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const ReminderPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.reminder) } />
      <Reminder />
    </>
  )
}

export default createPage(ReminderPage)
