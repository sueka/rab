import { hot } from 'react-hot-loader'
import React from 'react'
import { Switch } from 'react-router'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import CssBaseline from '@material-ui/core/CssBaseline'

import Route from '~/components/Route'

import messages from './messages'

export /* for testing */ const HomePage = React.lazy(() => import(/* webpackChunkName: "homePage" */ '~/components/HomePage'))
export /* for testing */ const CounterPage = React.lazy(() => import(/* webpackChunkName: "counter" */ '~/components/CounterPage'))
export /* for testing */ const InfoPage = React.lazy(() => import(/* webpackChunkName: "info" */ '~/components/InfoPage'))
export /* for testing */ const ReminderPage = React.lazy(() => import(/* webpackChunkName: "reminder" */ '~/components/ReminderPage'))
export /* for testing */ const NoMatch = React.lazy(() => import(/* webpackChunkName: "noMatch" */ '~/components/NoMatch'))

type Props =
  & InjectedIntlProps

const App: React.FunctionComponent<Props> = ({ intl: { formatMessage } }) => (
  <>
    <CssBaseline />
    <Helmet
      titleTemplate="%s - react-app-prototype"
      defaultTitle="react-app-prototype"
    />
    <Switch>
      <Route path="/" component={ HomePage } helmetProps={ { title: formatMessage(messages.home) } } />
      <Route path="/counter" component={ CounterPage } helmetProps={ { title: formatMessage(messages.counter) } } />
      <Route path="/info" component={ InfoPage } helmetProps={ { title: formatMessage(messages.info) } } />
      <Route path="/reminder" component={ ReminderPage } helmetProps={ { title: formatMessage(messages.reminder) } } />
      <Route path="*" component={ NoMatch } />
    </Switch>
  </>
)

export default hot(module)(injectIntl(App))
