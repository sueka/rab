import 'reflect-metadata'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { History, createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Container } from 'inversify'
import { Provider as ServiceProdiver } from 'inversify-react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import './types/globalTypes'

import { State, Action, Service, configureStore } from './redux'
import configureTheme from './configureTheme'

import ErrorBoundary from './components/ErrorBoundary'
import App from './components/App'
import IntlProvider from './containers/IntlProvider'

const containerImport = process.env.NODE_ENV === 'production' ? import('./container') : import('./container.dev')

interface Props {
  store: Store<State, Action>
  history: History
  container: Container
}

/**
 * The entry point component.
 */
const Main: React.FunctionComponent<Props> = ({ store, history, container }) => {
  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(() => configureTheme({ dark }), [dark])

  return (
    <ErrorBoundary>
      <Provider { ...{ store } }>
        <IntlProvider>
          <DndProvider backend={ HTML5Backend }>
            <ConnectedRouter { ...{ history } }>
              <ServiceProdiver { ...{ container } }>
                <MuiThemeProvider theme={ theme }>
                  <App />
                </MuiThemeProvider>
              </ServiceProdiver>
            </ConnectedRouter>
          </DndProvider>
        </IntlProvider>
      </Provider>
    </ErrorBoundary>
  )
}

containerImport.then(({ default: container }) => {
  const history = createBrowserHistory()
  const { store, sagaMiddleware } = configureStore(history)

  const service = container.resolve(Service)

  function rootSaga() {
    return service.rootSaga.call(service)
  }

  sagaMiddleware.run(rootSaga)

  ReactDOM.render(<Main { ...{ store, history, container } } />, document.getElementById('root'))
})
