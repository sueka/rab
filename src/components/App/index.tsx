import { hot } from 'react-hot-loader'
import React from 'react'
import { Switch } from 'react-router'
import Helmet from 'react-helmet'
import { InjectedIntlProps, injectIntl } from 'react-intl'

import Nav from '~/components/Nav'
import Route from '~/components/Route'

import messages from './messages'

export /* for testing */ const HomePage = React.lazy(() => import(/* webpackChunkName: "homePage" */ '~/components/HomePage'))
export /* for testing */ const Counter = React.lazy(() => import(/* webpackChunkName: "counter" */ '~/containers/Counter'))
export /* for testing */ const Info = React.lazy(() => import(/* webpackChunkName: "info" */ '~/components/Info'))
export /* for testing */ const Reminder = React.lazy(() => import(/* webpackChunkName: "reminder" */ '~/containers/Reminder'))
export /* for testing */ const NoMatch = React.lazy(() => import(/* webpackChunkName: "noMatch" */ '~/components/NoMatch'))

type Props =
  & InjectedIntlProps

const App: React.FunctionComponent<Props> = ({ intl: { formatMessage } }) => (
  <div>
    <Helmet
      titleTemplate="%s - react-app-prototype"
      defaultTitle="react-app-prototype"
    />
    <Nav />
    <Switch>
      <Route path="/" component={ HomePage } helmetProps={ { title: formatMessage(messages.home) } } />
      <Route path="/counter" component={ Counter } helmetProps={ { title: formatMessage(messages.counter) } } />
      <Route path="/info" component={ Info } helmetProps={ { title: formatMessage(messages.info) } } />
      <Route path="/reminder" component={ Reminder } helmetProps={ { title: formatMessage(messages.reminder) } } />
      <Route path="*" component={ NoMatch } />
    </Switch>
  </div>
)

export default hot(module)(injectIntl(App))
