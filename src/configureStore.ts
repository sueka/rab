import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { Action, Reducer, Store, applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware, { SagaMiddleware, SagaMiddlewareOptions } from 'redux-saga'

const logger = createLogger({
  diff: true,
})

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose
    : compose

export default function configureStore<S, A extends Action>(history: History, reducer: Reducer<S, A>, sagaMiddlewareOptions: SagaMiddlewareOptions): {
  store: Store<S, A>
  sagaMiddleware: SagaMiddleware
} {
  const sagaMiddleware = createSagaMiddleware(sagaMiddlewareOptions)

  const storeEnhancers = [
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
  ]

  if (process.env.NODE_ENV === 'development') {
    storeEnhancers.push(applyMiddleware(logger)) // tslint:disable-line:no-array-mutation
  }

  const store = createStore(
    reducer,
    composeEnhancers(...storeEnhancers)
  )

  return {
    store,
    sagaMiddleware, // applied
  }
}
