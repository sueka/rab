import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { HttpClientState, HttpClientAction, createHttpClientReducer } from './modules/httpClient'
import { CounterState, CounterAction, createCounterReducer } from './modules/counter'

export interface State {
  router: RouterState
  httpClient: HttpClientState
  counter: CounterState
}

export type Action = LocationChangeAction & CounterAction & HttpClientAction

const createReducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  httpClient: createHttpClientReducer({
    successful: true,
    fetching: false,
    results: [],
  }),
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
