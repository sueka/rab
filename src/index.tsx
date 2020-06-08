/* tslint:disable:no-import-side-effect */

import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import { ConnectedRouter } from 'connected-react-router'
import { History, createBrowserHistory } from 'history'
import { List, Map } from 'immutable'
import { interfaces } from 'inversify'
import { Provider as ServiceProdiver } from 'inversify-react'
import { SnackbarProvider } from 'notistack'
import React, { useCallback, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import { Saga } from 'redux-saga'
import 'reflect-metadata'

import CssBaseline from '@material-ui/core/CssBaseline'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import App from './components/App'
import IntlProvider from './components/IntlProvider'
import ThemeProvider from './components/ThemeProvider'
import createProvider from './createProvider'
import './lib/extensions/Boolean/Boolean.prototype.hashCode'
import './lib/extensions/Number/Number.prototype.hashCode'
import './lib/extensions/String/String.prototype.hashCode'
import typed from './lib/typed'
import Service, { State, createReducer, invariant } from './redux'

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
    locale: 'en',
    formats,
    messages,
    errors: List(),
  },
  reminder: {
    tasks: List(),
    errors: Map(),
  },
}

interface Props {
  history: History
  container: interfaces.Container
}

// NOTE: prefers-color-scheme の変更によって Main が rerender されると、 Provider が変更され、 ThemeProvider の state がリセットされる。
const ThemedApp: React.FunctionComponent<{}> = () => {
  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <ThemeProvider defaultDark={ dark }>
      <CssBaseline />
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

/**
 * The entry point component.
 */
const Main: React.FunctionComponent<Props> = ({ history, container }) => {
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
    const service = container.resolve(Service) // TODO: DI

    return service.rootSaga.call(service)
  }, [container])

  const Provider = createProvider(history, reducer, invariant, rootSaga)

  return (
    <>
      <Helmet
        titleTemplate="%s - react-app-prototype"
        defaultTitle="react-app-prototype"
      />
      <Provider renderError={ renderError }>
        <IntlProvider availableLocales={ ['en', 'ja'] }>
          <DndProvider backend={ HTML5Backend }>
            <ConnectedRouter history={ history }>
              <ServiceProdiver container={ container }>
                <ThemedApp />
              </ServiceProdiver>
            </ConnectedRouter>
          </DndProvider>
        </IntlProvider>
      </Provider>
    </>
  )
}

containerImport.then(({ default: container }) => {
  // TODO: DI BASE

  if (process.env.BASE === undefined) {
    throw new Error // TODO
  }

  const basename = process.env.BASE.slice(0, -1)

  const history = createBrowserHistory({
    basename,
  })

  ReactDOM.render(<Main history={ history } container={ container } />, document.getElementById('root'))
})
