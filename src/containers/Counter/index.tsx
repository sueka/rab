import { connect } from 'react-redux'

import { State } from '../../redux'
import { CounterAction, increment, decrement, incrementIfOdd, incrementAsync } from '../../redux/modules/counter'
import Counter from '../../components/Counter'

interface StateProps {
  value: number
}

interface DispatchProps {
  _increment(): CounterAction
  _decrement(): CounterAction
  _incrementIfOdd(value: number): CounterAction
  _incrementAsync(delay: number): CounterAction
}

const mapStateToProps = ({ counter: { count } }: State): StateProps => ({
  value: count,
})

const mapDispatchToProps: DispatchProps = {
  _increment: increment,
  _decrement: decrement,
  _incrementIfOdd: incrementIfOdd,
  _incrementAsync: incrementAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
