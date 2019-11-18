import 'reflect-metadata'

import React, { useMemo, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { History, createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Container } from 'inversify'
import { Provider as ServiceProdiver } from 'inversify-react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import './types/globalTypes'

import typed from './lib/typed'
import { Service, State, createReducer } from './redux'
import createProvider from './createProvider'
import configureTheme from './configureTheme'

import App from './components/App'
import IntlProvider from './components/IntlProvider'

import formats from '../public/formats/en.json' // tslint:disable-line:no-relative-imports

const containerImport = process.env.NODE_ENV === 'production' ? import('./container') : import('./container.dev')

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
      return typed<[string]>`${ String(error) }`
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
  )
}

containerImport.then(({ default: container }) => {
  const history = createBrowserHistory()

  ReactDOM.render(<Main { ...{ history, container } } />, document.getElementById('root'))
})
