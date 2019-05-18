import { Store, applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter, routerMiddleware } from 'connected-react-router'

import { DiContainerState, DiContainerAction, createDiContainerReducer } from './modules/diContainer'
import { CounterState, CounterAction, createCounterReducer } from './modules/counter'
import { GitHubApiImpl } from '../infrastructure'

export interface State {
  router: RouterState
  diContainer: DiContainerState
  counter: CounterState
}

export type Action =
  & LocationChangeAction
  & DiContainerAction
  & CounterAction

const createReducer = (history: History) => combineReducers<State, Action>({
  router: connectRouter(history),
  counter: createCounterReducer({
    count: 0,
  }),
  diContainer: createDiContainerReducer({
    gitHubApi: new GitHubApiImpl(),
  }),
})

export const configureStore = (history: History): Store<State, Action> => createStore(
  createReducer(history),
  compose(
    applyMiddleware(routerMiddleware(history))
  )
)
