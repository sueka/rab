import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
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

const mapDispatchToProps = (dispatch: Dispatch<CounterAction>): DispatchProps => ({
  _increment: () => dispatch(increment()),
  _decrement: () => dispatch(decrement()),
  _incrementIfOdd: (value: number) => dispatch(incrementIfOdd(value)),
  _incrementAsync: (delay: number) => dispatch(incrementAsync(delay)),
})

export const Counter = connect(mapStateToProps, mapDispatchToProps)(
  class extends React.Component<Props & RouteComponentProps> {
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
      const { handleIncrementIfOdd, handleIncrementAsync } = this

      return (
        <div>
          {value}
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrementIfOdd}>+ if odd</button>
          <button onClick={handleIncrementAsync}>+ async</button>
        </div>
      )
    }
  }
)
