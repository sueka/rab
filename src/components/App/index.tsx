import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'

import { Counter } from '../../containers/Counter'

export const App: React.FunctionComponent = () => (
  <>
    <Link to="/counter">counter</Link>
    <p>
      Hello, world!
    </p>
    <Switch>
      <Route path="/counter" component={Counter} />
    </Switch>
  </>
)
