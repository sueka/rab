import { hot } from 'react-hot-loader'
import React from 'react'
import { Switch } from 'react-router'
import Helmet from 'react-helmet'
import { FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl'

import Typography from '@material-ui/core/Typography'

import Nav from '~/components/Nav'
import Route from '~/components/Route'
import Today from '~/containers/Today'

import messages from './messages'

export /* for testing */ const Counter = React.lazy(() => import(/* webpackChunkName: "counter" */ '~/containers/Counter'))
export /* for testing */ const Info = React.lazy(() => import(/* webpackChunkName: "info" */ '~/components/Info'))
export /* for testing */ const Reminder = React.lazy(() => import(/* webpackChunkName: "reminder" */ '~/containers/Reminder'))

type Props =
  & InjectedIntlProps

const App: React.FunctionComponent<Props> = ({ intl: { formatMessage } }) => (
  <div>
    <Helmet
      titleTemplate="%s - react-app-prototype"
      defaultTitle="react-app-prototype"
    />
    <Nav />
    <Typography>
      <FormattedMessage { ...messages.helloWorld } />
    </Typography>
    <Typography>
      <FormattedNumber format="usd" value={ 100 } />
    </Typography>
    <Today />
    <Switch>
      <Route path="/counter" component={ Counter } helmetProps={ { title: formatMessage(messages.counter) } } />
      <Route path="/info" component={ Info } helmetProps={ { title: formatMessage(messages.info) } } />
      <Route path="/reminder" component={ Reminder } helmetProps={ { title: formatMessage(messages.reminder) } } />
    </Switch>
  </div>
)

export default hot(module)(injectIntl(App))
