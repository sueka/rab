import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { HttpClientState, HttpClientAction, httpClientSaga, createHttpClientReducer } from './modules/httpClient'
import { CounterState, CounterAction, counterSaga, createCounterReducer } from './modules/counter'

export interface State {
  router: RouterState
  httpClient: HttpClientState
  counter: CounterState
}

const initialState: Pick<State, 'httpClient' | 'counter'> = {
  httpClient: {
    successful: true,
    fetching: false,
    calls: [],
  },
  counter: {
    count: 0,
  },
}

export type Action = LocationChangeAction & CounterAction & HttpClientAction

export function* rootSaga(): SagaIterator {
  yield spawn(counterSaga)
  yield spawn(httpClientSaga)
}

const sagaMiddleware = createSagaMiddleware()

const createReducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  httpClient: createHttpClientReducer(initialState.httpClient),
  counter: createCounterReducer(initialState.counter),
})

export const configureStore = (history: History): {
  store: Store<State, Action>
  sagaMiddleware: SagaMiddleware<{}>
} => {
  const store = createStore(
    createReducer(history),
    compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history))
    )
  )

  return {
    store,
    sagaMiddleware, // Applied
  }
}
