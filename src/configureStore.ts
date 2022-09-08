import { configureStore as createStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { Action, Reducer, Store, StoreEnhancer, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { SagaMiddleware, SagaMiddlewareOptions } from 'redux-saga'

import createInvariantMiddleware, { Invariant } from '~/middleware/invariantMiddleware/createInvariantMiddleware'

const logger = createLogger({
  diff: true,
  collapsed: true,
})

export default function configureStore<S, A extends Action>(history: History, reducer: Reducer<S, A>, invariant: Invariant<S>, sagaMiddlewareOptions: SagaMiddlewareOptions): {
  store: Store<S, A>
  sagaMiddleware: SagaMiddleware
} {
  const sagaMiddleware = createSagaMiddleware(sagaMiddlewareOptions)
  const invariantMiddleware = createInvariantMiddleware(reducer, invariant)

  const enhancers: StoreEnhancer<{}, {}>[] = [
    applyMiddleware(sagaMiddleware),
    applyMiddleware(invariantMiddleware),
    applyMiddleware(routerMiddleware(history)),
  ]

  if (process.env['NODE_ENV'] === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION__ != null) {
      enhancers.unshift(window.__REDUX_DEVTOOLS_EXTENSION__)
    }

    enhancers.push(applyMiddleware(logger))
  }

  const store = createStore({
    reducer,
    enhancers,
  })

  return {
    store,
    sagaMiddleware, // applied
  }
}
