import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'

import Route from '../Route'
import LocaleSelect from '../../containers/LocaleSelect'
const Info = React.lazy(() => import(/* webpackChunkName: "info" */ '../Info'))
const Counter = React.lazy(() => import(/* webpackChunkName: "counter" */ '../../containers/Counter'))
import messages from './messages'

import * as classes from './styles.css'

// tslint:disable:jsx-no-lambda

const App: React.FunctionComponent = () => (
  <div className={ classes.App }>
    <Helmet
      titleTemplate="%s - react-app-prototype"
      defaultTitle="react-app-prototype"
    />
    <LocaleSelect />
    <Link to="/counter"><FormattedMessage { ...messages.counter } /></Link>
    <Link to="/info"><FormattedMessage { ...messages.info } /></Link>
    <p>
      <FormattedMessage { ...messages.helloWorld } />
    </p>
    <Switch>
      <Route exact strict sensitive path="/counter" component={ Counter } />
      <Route exact strict sensitive path="/info" component={ Info } />
    </Switch>
  </div>
)

export default hot(module)(App)
