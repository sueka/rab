import 'reflect-metadata'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { IntlProvider } from 'react-intl'

import { rootSaga, configureStore } from './redux'
import en from '../public/locales/en.json'

import ErrorBoundary from './components/ErrorBoundary'
import { App } from './components'

import './styles.css'

const history = createBrowserHistory()
const { store, sagaMiddleware } = configureStore(history)

sagaMiddleware.run(rootSaga)

const messages = {
  en,
}

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider { ...{ store } }>
        <IntlProvider locale="en" messages={ messages.en }>
          <ConnectedRouter { ...{ history } }>
            <DragDropContextProvider backend={ HTML5Backend }>
              <App />
            </DragDropContextProvider>
          </ConnectedRouter>
        </IntlProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
