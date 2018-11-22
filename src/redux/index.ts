import { Store, createStore, combineReducers } from 'redux'

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

export const store = createStore<State, Action>(
  reducer,
  initialState,
)
