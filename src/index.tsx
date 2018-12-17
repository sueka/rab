import '@babel/polyfill'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'

import { configureStore, rootSaga } from './redux'

import App from './components/App'

import './styles.css'

const history = createBrowserHistory()
const { store, sagaMiddleware } = configureStore(history)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider { ...{ store } }>
    <ConnectedRouter { ...{ history } }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
