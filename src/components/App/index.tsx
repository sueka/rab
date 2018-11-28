import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

import Counter from '../../containers/Counter'

import * as classes from './styles.css'

const App: React.FunctionComponent = () => (
  <div className={classes.App}>
    <Link to="/counter">counter</Link>
    <p>
      Hello, world!
    </p>
    <Switch>
      <Route path="/counter" component={Counter} />
    </Switch>
  </div>
)

export default hot(module)(App)
