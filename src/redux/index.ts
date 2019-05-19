import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { CounterState, CounterAction, counterSaga, createCounterReducer } from './modules/counter'

export interface State {
  router: RouterState
  counter: CounterState
}

export type Action =
  & LocationChangeAction
  & CounterAction

export function* rootSaga(): SagaIterator {
  yield spawn(counterSaga)
}

// FIXME: configureStore に含めるべきかも
const sagaMiddleware = createSagaMiddleware()

const createReducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  counter: createCounterReducer({
    count: 0,
  }),
})

export const configureStore = (history: History): {
  store: Store<State, Action>
  sagaMiddleware: SagaMiddleware
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
    sagaMiddleware, // applied
  }
}
