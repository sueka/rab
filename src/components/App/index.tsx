import React from 'react'
import Helmet from 'react-helmet'
import { hot } from 'react-hot-loader/root'
import { useIntl } from 'react-intl'
import { Redirect, Switch, useLocation } from 'react-router'

import CssBaseline from '@material-ui/core/CssBaseline'

import Nav from '~/components/Nav'
import Route from '~/lib/components/Route'
import messages from './messages'

export /* for testing */ const HomePage = React.lazy(() => import(/* webpackChunkName: "home" */ './HomePage'))
export /* for testing */ const ChessPage = React.lazy(() => import(/* webpackChunkName: "chess" */ './ChessPage'))
export /* for testing */ const CounterPage = React.lazy(() => import(/* webpackChunkName: "counter" */ './CounterPage'))
export /* for testing */ const InfoPage = React.lazy(() => import(/* webpackChunkName: "info" */ './InfoPage'))
export /* for testing */ const ReminderPage = React.lazy(() => import(/* webpackChunkName: "reminder" */ './ReminderPage'))
export /* for testing */ const NoMatch = React.lazy(() => import(/* webpackChunkName: "noMatch" */ './NoMatch'))

const App: React.FunctionComponent = () => {
  const { formatMessage } = useIntl()
  const location = useLocation()

  if (location.pathname === '/' && location.hash !== '') {
    const pathname = /^#(.*)$/.exec(location.hash)?.[1]

    // TODO: shape check

    return (
      <Redirect to={ {
        pathname,
      } } />
    )
  }

  return (
    <>
      <CssBaseline />
      <Helmet
        titleTemplate="%s - react-app-prototype"
        defaultTitle="react-app-prototype"
      />
      <Nav />
      <Switch>
        <Route exact strict sensitive path="/" component={ HomePage } helmetProps={ { title: formatMessage(messages.home) } } />
        <Route exact strict sensitive path="/chess" component={ ChessPage } helmetProps={ { title: formatMessage(messages.chess) } } />
        <Route exact strict sensitive path="/counter" component={ CounterPage } helmetProps={ { title: formatMessage(messages.counter) } } />
        <Route exact strict sensitive path="/info" component={ InfoPage } helmetProps={ { title: formatMessage(messages.info) } } />
        <Route exact strict sensitive path="/reminder" component={ ReminderPage } helmetProps={ { title: formatMessage(messages.reminder) } } />
        <Route path="*" component={ NoMatch } />
      </Switch>
    </>
  )
}

export default hot(App)
