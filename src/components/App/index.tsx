import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Switch } from 'react-router'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'

import { Route } from '..'
import { Counter, Info } from '../../containers'

import * as classes from './styles.css'

const App: React.FunctionComponent = () => (
  <div className={ classes.App }>
    <Helmet
      titleTemplate="%s - react-app-prototype"
      defaultTitle="react-app-prototype"
    />
    <Link to="/counter">counter</Link>
    <Link to="/info">info</Link>
    <p>
      Hello, world!
    </p>
    <Switch>
      <Route exact strict sensitive path="/counter" component={ Counter } />
      <Route exact strict sensitive path="/info" component={ Info } />
    </Switch>
  </div>
)

export default hot(module)(App)
