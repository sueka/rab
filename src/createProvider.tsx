import React from 'react'
import { Reducer, Store, Action } from 'redux'
import { Provider as OriginalProvider } from 'react-redux'
import { Saga } from 'redux-saga'
import { History } from 'history'

import { UnreachableError } from './lib/errors'
import configureStore from './configureStore'

interface Props {
  /**
   * @param children that throws {error}
   */
  renderError(error: unknown, children: React.ReactNode): React.ReactNode
}

interface State {
  hasError: boolean
  error?: unknown
}

export default function createProvider<S, A extends Action>(history: History, reducer: Reducer<S, A>, saga: Saga) {
  return class Provider extends React.Component<Props, State> {
    private store: Store<S, A>

    // NOTE: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/826ce0f1ce1d1887d199986283630d6f63075ad5/types/react/index.d.ts#L419 にも関わらず、初期化されていない state は null であるため、初期化を強制するためにプロパティ宣言を行う。
    public state: Readonly<State> = {
      hasError: false,
    }

    constructor(props: Props) {
      super(props)

      const exceptionNeutralReducer: Reducer<S, A> = (state, action) => {
        try {
          return reducer(state, action)
        } catch (error) {
          this.handleError(error)

          if (state === undefined) {
            throw new UnreachableError()
          }

          return state
        }
      }

      const { store, sagaMiddleware } = configureStore(history, exceptionNeutralReducer, {
        onError: this.handleError,
      })

      this.store = store

      sagaMiddleware.run(saga).toPromise().catch(this.handleError)
    }

    public static getDerivedStateFromError = (error: unknown) => ({
      hasError: true,
      error,
    })

    private handleError = (error: unknown) => {
      this.setState({
        hasError: true,
        error,
      })
    }

    public render() {
      const { renderError, children } = this.props
      const { hasError, error } = this.state

      if (hasError) {
        return renderError(error, children)
      }

      return (
        <OriginalProvider store={ this.store }>
          { children }
        </OriginalProvider>
      )
    }
  }
}
