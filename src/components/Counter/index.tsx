import * as React from 'react'

interface Props {
  value: number
  _increment(): void
  _decrement(): void
  _incrementIfOdd(value: number): void
  _incrementAsync(delay: number): void
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
