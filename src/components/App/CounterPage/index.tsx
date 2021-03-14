import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Counter from '~/components/Counter'
import { createPage } from '~/components/PageTemplate'
import messages from './messages'

const CounterPage: React.FC = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.counter) } />
      <Counter />
    </>
  )
}

export default createPage(CounterPage)
