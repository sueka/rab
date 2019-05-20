import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { CounterState, CounterAction, counterSaga, createCounterReducer } from './modules/counter'
import { LocaleSelectorState, LocaleSelectorAction, localeSelectorSaga, createLocaleSelectorReducer } from './modules/localeSelector'

export interface State {
  router: RouterState
  counter: CounterState
  localeSelector: LocaleSelectorState
}

export type Action =
  & LocationChangeAction
  & CounterAction
  & LocaleSelectorAction

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'

addLocaleData(en)

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
  localeSelector: createLocaleSelectorReducer({
    availableLocales: [
      'en',
    ],
    locale: 'en',
    messages: {},
  }),
})

// TODO: use globalThis
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export const configureStore = (history: History): {
  store: Store<State, Action>
  sagaMiddleware: SagaMiddleware
} => {
  const store = createStore(
    createReducer(history),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== undefined ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose)(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history))
    )
  )

  return {
    store,
    sagaMiddleware, // applied
  }
}
