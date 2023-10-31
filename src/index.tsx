import 'element-qsa-scope'
import 'react-app-polyfill/stable'

import '~/polyfills/apps/Document.prototype.fullscreenElement'
import '~/polyfills/apps/Document.prototype.fullscreenEnabled'
import '~/polyfills/apps/globalThis.Notification'
import '~/polyfills/apps/globalThis.SpeechRecognition'

import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ConnectedRouter } from 'connected-react-router'
import FaviconNotification from 'favicon-notification'
import { createBrowserHistory } from 'history'
import { List, Map } from 'immutable'
import { interfaces } from 'inversify'
import { Provider as ServiceProvider } from 'inversify-react'
import { create } from 'jss'
import rtl from 'jss-rtl'
import React, { StrictMode, useCallback, useEffect, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import { RecoilRoot } from 'recoil'
import { Saga } from 'redux-saga'
import 'reflect-metadata'

import { shouldBePresent } from '~/asserters/commonAsserters'
import App from '~/components/App'
import IntlProvider from '~/components/IntlProvider'
import SnackbarProvider from '~/components/SnackbarProvider'
import ThemeProvider from '~/components/ThemeProvider'
import createProvider, { Props as ProviderProps } from '~/createProvider'
import '~/extensions/Boolean/Boolean.prototype.hashCode'
import '~/extensions/Number/Number.prototype.hashCode'
import '~/extensions/String/String.prototype.hashCode'
import Service, { Action, State, createReducer, invariant } from '~/redux'
import typed from '~/typed'
import { asFormats } from '~/validators/intlValidators'
import './global.css'
import './transition.css'

import formats from '../public/formats/en.json'
import messages from '../public/messages/en.json'

const containerImport = process.env['NODE_ENV'] === 'production' ? import('./container') : import('./container.dev')

interface Props {
  container: interfaces.Container
  baseUrl: string
}

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

shouldBePresent(process.env['BASE_NAME'])

const history = createBrowserHistory({
  basename: process.env['BASE_NAME'],
})

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

/**
 * The entry point component.
 */
const Main: React.FC<Props> = ({ container, baseUrl }) => {
  const reducer = useMemo(() => createReducer(initialState, history), [])

  const rootSaga = useCallback<Saga>(() => {
    const service = container.resolve(Service) // TODO: DI

    return service.rootSaga.call(service)
  }, [container])

  const Provider = useMemo(() => createProvider(history, reducer, invariant, rootSaga), [reducer, rootSaga])

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

  useEffect(() => {
    FaviconNotification.init({
      url: new URL('favicon.svg', baseUrl).href,
    })
  }, [baseUrl])

  return (
    <>
      <Helmet
        titleTemplate="%s - Rap"
        defaultTitle="Rap"
      />
      <RecoilRoot>
        <Provider renderError={ renderError }>
          <IntlProvider availableLocales={ ['en', 'he', 'ja'] }>
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
  ReactDOM.render(
    <StrictMode>
      <Main
        container={ container }
        baseUrl={ typed<[string, string]>`${ globalThis.location.origin }${ process.env['BASE_NAME'] !== undefined ? typed<[string]>`${ process.env['BASE_NAME'] }/` : '' }` }
      />
    </StrictMode>,
    document.getElementById('root')
  )
})
