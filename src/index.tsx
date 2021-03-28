/* tslint:disable:no-import-side-effect */

import 'element-qsa-scope'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ConnectedRouter } from 'connected-react-router'
import { History, createBrowserHistory } from 'history'
import { List, Map } from 'immutable'
import { interfaces } from 'inversify'
import { Provider as ServiceProvider } from 'inversify-react'
import { create } from 'jss'
import rtl from 'jss-rtl'
import React, { useCallback, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import { RecoilRoot } from 'recoil'
import { Saga } from 'redux-saga'
import 'reflect-metadata'

import App from '~/components/App'
import IntlProvider from '~/components/IntlProvider'
import ThemeProvider from '~/components/ThemeProvider'
import createProvider, { Props as ProviderProps } from '~/createProvider'
import SnackbarProvider from '~/lib/components/SnackbarProvider'
import '~/lib/extensions/Boolean/Boolean.prototype.hashCode'
import '~/lib/extensions/Number/Number.prototype.hashCode'
import '~/lib/extensions/String/String.prototype.hashCode'
import '~/lib/polyfills/SpeechRecognition'
import typed from '~/lib/typed'
import { asFormats } from '~/lib/validators/intlValidators'
import Service, { Action, State, createReducer, invariant } from '~/redux'
import './classes.css'

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
    formats: asFormats(formats),
    messages,
    errors: List(),
  },
  reminder: {
    tasks: List(),
    errors: Map(),
  },
  userAuthn: {},
}

interface Props {
  history: History
  container: interfaces.Container
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

/**
 * The entry point component.
 */
const Main: React.FC<Props> = ({ history, container }) => {
  const reducer = useMemo(() => createReducer(history, initialState), [history])

  const rootSaga = useCallback<Saga>(() => {
    const service = container.resolve(Service) // TODO: DI

    return service.rootSaga.call(service)
  }, [container])

  const Provider = useMemo(() => createProvider(history, reducer, invariant, rootSaga), [history, reducer, rootSaga])

  const renderError: ProviderProps<State, Action>['renderError'] = useCallback((error: unknown) => {
    if (error instanceof Error) {
      // NOTE: `rootSaga` や `rootSaga` に attach された saga から error が投げられた場合、 Maximum recursion depth exceeded が発生する。
      return React.createElement(Provider, {
        renderError,
      }, (
        <div>
          { typed<[string]>`${ String(error) }` }
        </div>
      ))
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }, [Provider])

  const dark = useMediaQuery('(prefers-color-scheme: dark)')

  return (
    <>
      <Helmet
        titleTemplate="%s - react-app-prototype"
        defaultTitle="react-app-prototype"
      />
      <RecoilRoot>
        <Provider renderError={ renderError }>
          <IntlProvider availableLocales={ ['en', 'ja', 'he'] }>
            <DndProvider backend={ HTML5Backend }>
              <ConnectedRouter history={ history }>
                <ServiceProvider container={ container }>
                  <StylesProvider jss={ jss }>
                    <ThemeProvider defaultDark={ dark }>
                      <CssBaseline />
                      <SnackbarProvider maxSnack={ 1 } hideIconVariant>
                        <App />
                      </SnackbarProvider>
                    </ThemeProvider>
                  </StylesProvider>
                </ServiceProvider>
              </ConnectedRouter>
            </DndProvider>
          </IntlProvider>
        </Provider>
      </RecoilRoot>
    </>
  )
}

containerImport.then(({ default: container }) => {
  // TODO: DI BASE_NAME

  if (process.env.BASE_NAME === undefined) {
    throw new Error // TODO
  }

  const history = createBrowserHistory({
    basename: process.env.BASE_NAME,
  })

  ReactDOM.render(<Main history={ history } container={ container } />, document.getElementById('root'))
})
