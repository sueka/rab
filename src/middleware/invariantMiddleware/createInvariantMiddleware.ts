import { Action, Middleware, Reducer } from 'redux'

export type Invariant<S> = (state: S) => boolean

const createInvariantMiddleware: <S, A extends Action>(reducer: Reducer<S, A>, invariant: Invariant<S>) => Middleware = (reducer, invariant) => (store) => (next) => (action) => {
  const oldState = store.getState()
  const newState = reducer(oldState, action)

  if (!invariant(newState)) {
    throw new Error('Invariant Violation') // TODO
  }

  return next(action)
}

export default createInvariantMiddleware
