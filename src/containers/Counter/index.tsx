import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { State } from '../../redux'
import { CounterAction, increment, decrement } from '../../redux/modules/counter'

interface StateProps {
  value: number
}

interface DispatchProps {
  _increment(): CounterAction
  _decrement(): CounterAction
}

type Props = StateProps & DispatchProps

const mapStateToProps = ({ counter: { count } }: State): StateProps => ({
  value: count,
})

const mapDispatchToProps = (dispatch: Dispatch<CounterAction>): DispatchProps => ({
  _increment: () => dispatch(increment()),
  _decrement: () => dispatch(decrement()),
})

const _Counter: React.FunctionComponent<Props> = ({ value, _increment: handleIncrement, _decrement: handleDecrement }) => (
  <div>
    {value}
    <button onClick={handleIncrement}>+</button>
    <button onClick={handleDecrement}>-</button>
  </div>
)

export const Counter = connect(mapStateToProps, mapDispatchToProps)(_Counter)
