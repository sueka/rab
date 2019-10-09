import 'reflect-metadata'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider as ServiceProdiver } from 'inversify-react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import './types/globalTypes'

import { Service, configureStore } from './redux'
import muiThemeOptions from './muiThemeOptions'

import ErrorBoundary from './components/ErrorBoundary'
import App from './components/App'
import IntlProvider from './containers/IntlProvider'

import './styles.css'

const containerImport = process.env.NODE_ENV === 'production' ? import('./container') : import('./container.dev')

containerImport.then(({ default: container }) => {
  const history = createBrowserHistory()
  const { store, sagaMiddleware } = configureStore(history)

  const muiTheme = createMuiTheme(muiThemeOptions)

  const service = container.resolve(Service)

  function rootSaga() {
    return service.rootSaga.call(service)
  }

  sagaMiddleware.run(rootSaga)

  ReactDOM.render(
    (
      <ErrorBoundary>
        <Provider { ...{ store } }>
          <IntlProvider>
            <DndProvider backend={ HTML5Backend }>
              <ConnectedRouter { ...{ history } }>
                <ServiceProdiver { ...{ container } }>
                  <MuiThemeProvider theme={ muiTheme }>
                    <App />
                  </MuiThemeProvider>
                </ServiceProdiver>
              </ConnectedRouter>
            </DndProvider>
          </IntlProvider>
        </Provider>
      </ErrorBoundary>
    ),
    document.getElementById('root')
  )
})
