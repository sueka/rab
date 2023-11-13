import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import { createPage } from '~/components/PageTemplate'
import messages from './messages'

const ChatPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.chat) } />
    </>
  )
}

export default createPage(ChatPage)
