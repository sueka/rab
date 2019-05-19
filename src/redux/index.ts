import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { CounterState, CounterAction, createCounterReducer } from './modules/counter'

export interface State {
  router: RouterState
  counter: CounterState
}

export type Action =
  & LocationChangeAction
  & CounterAction

const createReducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  counter: createCounterReducer({
    count: 0,
  }),
})

export const configureStore = (history: History): Store<State, Action> => createStore(
  createReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history))
  )
)
