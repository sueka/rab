import { Store, applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'

import { CounterState, CounterAction, initialCounterState, counterReducer } from './modules/counter'

export interface State {
  counter: CounterState
}

const initialState: Pick<State, 'counter'> = {
  counter: initialCounterState,
}

export type Action = CounterAction

export const reducer = combineReducers<State, Action>({
  counter: counterReducer,
})

const sagaMiddleware = createSagaMiddleware()

type Saga = () => Iterator<any>

export const configureStore = (): Store<State, Action> & {
  runSaga(saga: Saga): Task,
} => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  )

  return {
    ...store,
    runSaga: sagaMiddleware.run,
  }
}
