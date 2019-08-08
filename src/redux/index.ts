import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'
import { createLogger } from 'redux-logger'
import { injectable, inject } from 'inversify'

import { CounterState, CounterAction, CounterService, createCounterReducer } from './modules/counter'
import { IoState, IoAction, createIoReducer } from './modules/io'
import { LocaleSelectorState, LocaleSelectorAction, LocaleSelectorService, createLocaleSelectorReducer } from './modules/localeSelector'
import { ReminderState, ReminderAction, ReminderService, createReminderReducer } from './modules/reminder'
import formats from '../../public/formats/en.json' // tslint:disable-line:no-relative-imports

export interface State {
  router: RouterState
  counter: CounterState
  io: IoState
  localeSelector: LocaleSelectorState
  reminder: ReminderState
}

type Action =
  & LocationChangeAction
  & CounterAction
  & IoAction
  & LocaleSelectorAction
  & ReminderAction

import { addLocaleData } from 'react-intl'
import * as en from 'react-intl/locale-data/en'
import * as ja from 'react-intl/locale-data/ja'

addLocaleData(en)
addLocaleData(ja)

@injectable()
export class Service {
  @inject(CounterService) private counterService!: CounterService
  @inject(LocaleSelectorService) private localeSelectorService!: LocaleSelectorService
  @inject(ReminderService) private reminderService!: ReminderService

  public *rootSaga(): SagaIterator {
    yield spawn([this.counterService, this.counterService.rootSaga])
    yield spawn([this.localeSelectorService, this.localeSelectorService.rootSaga])
    yield spawn([this.reminderService, this.reminderService.rootSaga])
  }
}

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
  reminder: createReminderReducer({
    tasks: [],
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
  const sagaMiddleware = createSagaMiddleware()

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
