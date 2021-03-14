import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import { createPage } from '~/components/PageTemplate'
import Paint from '~/components/Paint'
import messages from './messages'

const PaintPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.paint) } />
      <Paint />
    </>
  )
}

export default createPage(PaintPage)
