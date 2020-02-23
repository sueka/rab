import React from 'react'
import Helmet from 'react-helmet'
import { useIntl } from 'react-intl'

import Counter from '~/components/Counter'
import messages from './messages'

const CounterPage: React.FunctionComponent = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet title={ formatMessage(messages.counter) } />
      <Counter />
    </>
  )
}

export default CounterPage
