import * as React from 'react'

import { StateProps, DispatchProps } from '../../containers/Counter'

type Props = StateProps & DispatchProps

export default class Counter extends React.Component<Props> {
  private handleIncrementIfOdd = () => {
    const { value, _incrementIfOdd } = this.props

    _incrementIfOdd(value)
  }

  private handleIncrementAsync = () => {
    const { _incrementAsync } = this.props

    _incrementAsync(1000)
  }

  public render() {
    const { value, _increment, _decrement } = this.props

    return (
      <div>
        { value }
        <button onClick={ _increment }>+</button>
        <button onClick={ _decrement }>-</button>
        <button onClick={ this.handleIncrementIfOdd }>+ if odd</button>
        <button onClick={ this.handleIncrementAsync }>+ async</button>
      </div>
    )
  }
}
