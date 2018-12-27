import * as React from 'react'

import { increment, decrement, incrementIfOdd, incrementAsync } from '../../redux/modules/counter'

interface Props {
  value: number
  _increment: typeof increment
  _decrement: typeof decrement
  _incrementIfOdd: typeof incrementIfOdd
  _incrementAsync: typeof incrementAsync
}

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
    const { value, _increment: handleIncrement, _decrement: handleDecrement } = this.props

    return (
      <div>
        { value }
        <button onClick={ handleIncrement }>+</button>
        <button onClick={ handleDecrement }>-</button>
        <button onClick={ this.handleIncrementIfOdd }>+ if odd</button>
        <button onClick={ this.handleIncrementAsync }>+ async</button>
      </div>
    )
  }
}
