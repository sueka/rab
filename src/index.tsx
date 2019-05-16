import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { configureStore } from './redux'

import ErrorBoundary from './components/ErrorBoundary'
import App from './components/App'

import './styles.css'

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider { ...{ store } }>
        <ConnectedRouter { ...{ history } }>
          <DragDropContextProvider backend={ HTML5Backend }>
            <App />
          </DragDropContextProvider>
        </ConnectedRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
