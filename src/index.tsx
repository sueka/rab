/* tslint:disable:no-import-side-effect */

import { ConnectedRouter } from 'connected-react-router'
import { History, createBrowserHistory } from 'history'
import { Map } from 'immutable'
import { Container } from 'inversify'
import { Provider as ServiceProdiver } from 'inversify-react'
import { SnackbarProvider } from 'notistack'
import React, { useCallback, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import { Saga } from 'redux-saga'
import 'reflect-metadata'

import { MuiThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import App from './components/App'
import IntlProvider from './components/IntlProvider'
import configureTheme from './configureTheme'
import createProvider from './createProvider'
import './lib/extensions/Boolean/Boolean.prototype.hashCode'
import './lib/extensions/Number/Number.prototype.hashCode'
import './lib/extensions/String/String.prototype.hashCode'
import typed from './lib/typed'
import Service, { State, createReducer } from './redux'
import './types/globalTypes'

import formats from '../public/formats/en.json' // tslint:disable-line:no-relative-imports
import messages from '../public/messages/en.json' // tslint:disable-line:no-relative-imports

const containerImport = process.env.NODE_ENV === 'production' ? import('./container') : import('./container.dev')

const initialState: Alt.Omit<State, 'router'> = {
  chess: {
    board: {
      chessmen: Map(),
    },
  },
  counter: {
    count: 0,
  },
  io: {
    now: new Date,
  },
  localeSelector: {
    availableLocales: [
      'en',
      'ja',
    ],
    locale: 'en',
    formats,
    messages,
    errors: [],
  },
  reminder: {
    tasks: [],
    errors: {},
  },
}

interface Props {
  history: History
  container: Container
}

/**
 * The entry point component.
 */
const Main: React.FunctionComponent<Props> = ({ history, container }) => {
  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(() => configureTheme({ dark }), [dark])

  const renderError = useCallback((error: unknown) => {
    if (error instanceof Error) {
      // NOTE: `rootSaga` とそれに attach された saga から error が投げられた場合、 Maximum recursion depth exceeded が発生する。
      return (
        <Provider renderError={ renderError }>
          <div>
            { typed<[string]>`${ String(error) }` }
          </div>
        </Provider>
      )
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }, [])

  const reducer = useMemo(() => createReducer(history, initialState), [history])

  const rootSaga = useCallback<Saga>(() => {
    const service = container.resolve(Service)

    return service.rootSaga.call(service)
  }, [container])

  const Provider = createProvider(history, reducer, rootSaga)

  return (
    <Provider renderError={ renderError }>
      <IntlProvider>
        <DndProvider backend={ HTML5Backend }>
          <ConnectedRouter history={ history }>
            <ServiceProdiver container={ container }>
              <MuiThemeProvider theme={ theme }>
                <SnackbarProvider>
                  <App />
                </SnackbarProvider>
              </MuiThemeProvider>
            </ServiceProdiver>
          </ConnectedRouter>
        </DndProvider>
      </IntlProvider>
    </Provider>
  )
}

containerImport.then(({ default: container }) => {
  if (process.env.BASE_URL === undefined || !process.env.BASE_URL.startsWith(window.location.origin)) {
    throw new Error // TODO
  }

  const basename = process.env.BASE_URL.slice(window.location.origin.length)

  const history = createBrowserHistory({
    basename,
  })

  ReactDOM.render( <Main history={ history } container={ container } />, document.getElementById('root'))
})
