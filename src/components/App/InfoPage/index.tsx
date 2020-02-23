import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Info from '~/components/Info'
import messages from './messages'

const InfoPage: React.FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.info) } />
      <Info />
    </>
  )
}

export default InfoPage
