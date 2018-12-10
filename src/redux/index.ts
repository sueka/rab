import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'
import { Maybe } from 'tsmonad'

import { CounterState, CounterAction, counterReducer, counterSaga } from './modules/counter'
import { HttpClientState, HttpClientAction, httpClientReducer, httpClientSaga } from './modules/httpClient'

export interface State {
  router: RouterState
  counter: CounterState
  info: HttpClientState
}

const initialState: Pick<State, 'counter' | 'info'> = {
  counter: {
    count: 0,
  },
  info: {
    successful: true,
    fetching: false,
    response: Maybe.nothing(),
  },
}

export type Action = LocationChangeAction & CounterAction & HttpClientAction

export const reducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  counter: counterReducer,
  info: httpClientReducer,
})

export function* rootSaga(): SagaIterator {
  yield spawn(counterSaga)
  yield spawn(httpClientSaga)
}

const sagaMiddleware = createSagaMiddleware()

export const configureStore = (history: History): {
  store: Store<State, Action>
  sagaMiddleware: SagaMiddleware<{}>
} => {
  const store = createStore(
    reducer(history),
    initialState,
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
