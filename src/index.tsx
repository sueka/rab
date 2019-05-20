import 'reflect-metadata'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { rootSaga, configureStore } from './redux'

import ErrorBoundary from './components/ErrorBoundary'
import { App } from './components'
import { IntlProvider } from './containers'

import './styles.css'

const history = createBrowserHistory()
const { store, sagaMiddleware } = configureStore(history)

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider { ...{ store } }>
        <IntlProvider>
          <DragDropContextProvider backend={ HTML5Backend }>
            <ConnectedRouter { ...{ history } }>
              <App />
            </ConnectedRouter>
          </DragDropContextProvider>
        </IntlProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
