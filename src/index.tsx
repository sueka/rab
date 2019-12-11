import 'reflect-metadata'

import React, { useMemo, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { History, createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Container } from 'inversify'
import { Provider as ServiceProdiver } from 'inversify-react'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ja from 'react-intl/locale-data/ja'

import { MuiThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { SnackbarProvider } from 'notistack'

import './types/globalTypes'

import typed from './lib/typed'
import { Service, State, createReducer } from './redux'
import createProvider from './createProvider'
import configureTheme from './configureTheme'

import App from './components/App'
import IntlProvider from './components/IntlProvider'

import formats from '../public/formats/en.json' // tslint:disable-line:no-relative-imports

const containerImport = process.env.NODE_ENV === 'production' ? import('./container') : import('./container.dev')

addLocaleData(en)
addLocaleData(ja)

const initialState: Alt.Omit<State, 'router'> = {
  chess: {
    board: {
      pieces: [],
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

  const rootSaga = useCallback(() => {
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
  const history = createBrowserHistory()

  ReactDOM.render( <Main history={ history } container={ container } />, document.getElementById('root'))
})
