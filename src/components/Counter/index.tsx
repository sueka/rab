import * as React from 'react'
import Helmet from 'react-helmet'

import { CounterActionDispatcher } from '../../redux/modules/counter'

export interface StateProps {
  value: number
}

export interface DispatchProps {
  dispatchedActions: CounterActionDispatcher
}

type Props = StateProps & DispatchProps

export default class Counter extends React.Component<Props> {
  private handleIncrementIfOdd = () => {
    const { value, dispatchedActions: { incrementIfOdd } } = this.props

    incrementIfOdd(value)
  }

  private handleIncrementAsync = () => {
    const { dispatchedActions: { incrementAsync } } = this.props

    incrementAsync(1000)
  }

  public render() {
    const { value, dispatchedActions: { increment, decrement } } = this.props

    return (
      <div>
        <Helmet>
          <title>counter</title>
        </Helmet>
        { value }
        <button onClick={ increment }>+</button>
        <button onClick={ decrement }>-</button>
        <button onClick={ this.handleIncrementIfOdd }>+ if odd</button>
        <button onClick={ this.handleIncrementAsync }>+ async</button>
      </div>
    )
  }
}
