import { History } from 'history'
import React from 'react'
import { Provider as OriginalProvider } from 'react-redux'
import { Action, Reducer, Store } from 'redux'
import { Saga } from 'redux-saga'

import configureStore from './configureStore'
import { UnreachableError } from './lib/errors'

type ErrorCause = 'component' | 'reducer' | 'saga' | 'rootSaga'

interface Props<S, A extends Action> {
  /**
   * @param children that throws {error}
   * @param store when {error} is thrown
   */
  renderError(error: unknown, children: React.ReactNode, store: Store<S, A>, cause: ErrorCause): React.ReactNode
}

interface State {
  hasError: boolean
  error?: unknown
  cause?: ErrorCause
}

const MAXIMUM_RECURSION_DEPTH = 100

export default function createProvider<S, A extends Action>(history: History, reducer: Reducer<S, A>, saga: Saga) {
  let recursionDepth = 0 // tslint:disable-line:no-let

  return class Provider extends React.Component<Props<S, A>, State> {
    private store: Store<S, A>

    // NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/826ce0f1ce1d1887d199986283630d6f63075ad5/types/react/index.d.ts#L419 にも関わらず、初期化されていない state は null であるため、初期化を強制するためにプロパティ宣言を行う。
    public state: Readonly<State> = {
      hasError: false,
    }

    constructor(props: Props<S, A>) {
      super(props)

      const exceptionNeutralReducer: Reducer<S, A> = (state, action) => {
        try {
          return reducer(state, action)
        } catch (error) {
          this.handleError(error, 'reducer')

          if (state === undefined) {
            throw new UnreachableError()
          }

          return state
        }
      }

      const { store, sagaMiddleware } = configureStore(history, exceptionNeutralReducer, {
        onError: (error) => this.handleError(error, 'saga'),
      })

      this.store = store

      sagaMiddleware.run(saga).toPromise().catch((error) => this.handleError(error, 'rootSaga'))
    }

    public static getDerivedStateFromError = (error: unknown) => ({
      hasError: true,
      error,
      cause: 'component',
    })

    private handleError = (error: unknown, cause: ErrorCause) => {
      this.setState({
        hasError: true,
        error,
        cause,
      })
    }

    public render() {
      const { renderError, children } = this.props
      const { hasError, error, cause } = this.state

      if (hasError) {
        ++recursionDepth

        if (recursionDepth > MAXIMUM_RECURSION_DEPTH) {
          throw new Error('Maximum recursion depth exceeded')
        }

        if (cause === undefined) {
          throw new Error // TODO
        }

        return renderError(error, children, this.store, cause)
      }

      return (
        <OriginalProvider store={ this.store }>
          { children }
        </OriginalProvider>
      )
    }
  }
}
