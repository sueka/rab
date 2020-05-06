import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Paint from '~/components/Paint'
import { createPage } from '~/templates/PageTemplate'
import messages from './messages'

const PaintPage: React.FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.paint) } />
      <Paint />
    </>
  )
}

export default createPage(PaintPage)
