import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { SagaMiddleware, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { CounterState, CounterAction, counterReducer, counterSaga } from './modules/counter'

export interface State {
  counter: CounterState
  router: RouterState
}

const initialState: Pick<State, 'counter'> = {
  counter: {
    count: 0,
  },
}

export type Action = CounterAction & LocationChangeAction

export const reducer = (history: History) => combineReducers<State, Action>({
  counter: counterReducer,
  router: connectRouter(history),
})

export function* rootSaga(): SagaIterator {
  yield spawn(counterSaga)
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
