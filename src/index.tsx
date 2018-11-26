import '@babel/polyfill'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'

import { counterSaga } from './redux/modules/counter'

import { App } from './components/App'

import { configureStore } from './redux'

import './styles.css'

const history = createBrowserHistory()
const store = configureStore(history)

store.runSaga(counterSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
