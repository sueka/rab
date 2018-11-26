import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import createSagaMiddleware, { Task, SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { CounterState, CounterAction, initialCounterState, counterReducer, counterSaga } from './modules/counter'

export interface State {
  counter: CounterState
  router: RouterState
}

const initialState: Pick<State, 'counter'> = {
  counter: initialCounterState,
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

type Saga = () => Iterator<any>

export const configureStore = (history: History): Store<State, Action> & {
  runSaga(saga: Saga): Task
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
    ...store,
    runSaga: sagaMiddleware.run,
  }
}
