import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

import { State } from '../../redux'
import { CounterAction, increment, decrement, incrementIfOdd, incrementAsync } from '../../redux/modules/counter'

interface StateProps {
  value: number
}

interface DispatchProps {
  _increment(): CounterAction
  _decrement(): CounterAction
  _incrementIfOdd(value: number): CounterAction
  _incrementAsync(delay: number): CounterAction
}

type Props = StateProps & DispatchProps

const mapStateToProps = ({ counter: { count } }: State): StateProps => ({
  value: count,
})

const mapDispatchToProps = {
  _increment: increment,
  _decrement: decrement,
  _incrementIfOdd: incrementIfOdd,
  _incrementAsync: incrementAsync,
}

class Counter extends React.Component<Props & RouteComponentProps> {
  private handleIncrementIfOdd = () => {
    const { value, _incrementIfOdd } = this.props

    return _incrementIfOdd(value)
  }

  private handleIncrementAsync = () => {
    const { _incrementAsync } = this.props

    return _incrementAsync(1000)
  }

  public render() {
    const { value, _increment: handleIncrement, _decrement: handleDecrement } = this.props

    return (
      <div>
        {value}
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={this.handleIncrementIfOdd}>+ if odd</button>
        <button onClick={this.handleIncrementAsync}>+ async</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
