import { hot } from 'react-hot-loader'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

import Counter from '../../containers/Counter'
import Info from '../../containers/Info'

import * as classes from './styles.css'

const App: React.FunctionComponent = () => (
  <div className={ classes.App }>
    <Link to="/counter">counter</Link>
    <Link to="/info">info</Link>
    <p>
      Hello, world!
    </p>
    <Switch>
      <Route path="/counter" component={ Counter } />
      <Route path="/info" component={ Info } />
    </Switch>
  </div>
)

export default hot(module)(App)
