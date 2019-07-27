import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'

import { CounterState, CounterAction, counterSaga, createCounterReducer } from './modules/counter'
import { IoState, IoAction, createIoReducer } from './modules/io'
import { LocaleSelectorState, LocaleSelectorAction, localeSelectorSaga, createLocaleSelectorReducer } from './modules/localeSelector'
import formats from '../../public/formats/en.json' // tslint:disable-line:no-relative-imports

export interface State {
  router: RouterState
  counter: CounterState
  io: IoState
  localeSelector: LocaleSelectorState
}

type Action =
  & LocationChangeAction
  & CounterAction
  & IoAction
  & LocaleSelectorAction

import { addLocaleData } from 'react-intl'
import * as en from 'react-intl/locale-data/en'
import * as ja from 'react-intl/locale-data/ja'

addLocaleData(en)
addLocaleData(ja)

export function* rootSaga(): SagaIterator {
  yield spawn(counterSaga)
  yield spawn(localeSelectorSaga)
}

// FIXME: configureStore に含めるべきかも
const sagaMiddleware = createSagaMiddleware()

const createReducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  counter: createCounterReducer({
    count: 0,
  }),
  io: createIoReducer({
    now: new Date(),
  }),
  localeSelector: createLocaleSelectorReducer({
    availableLocales: [
      'en',
      'ja',
    ],
    locale: 'en',
    formats,
    messages: {},
    errors: [],
  }),
})

// TODO: use globalThis
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const logger = createLogger({
  diff: true,
})

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose
    : compose

export const configureStore = (history: History): {
  store: Store<State, Action>
  sagaMiddleware: SagaMiddleware
} => {
  const storeEnhancers = [
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
  ]

  if (process.env.NODE_ENV === 'development') {
    storeEnhancers.push(applyMiddleware(logger)) // tslint:disable-line:no-array-mutation
  }

  const store = createStore(
    createReducer(history),
    composeEnhancers(...storeEnhancers)
  )

  return {
    store,
    sagaMiddleware, // applied
  }
}
