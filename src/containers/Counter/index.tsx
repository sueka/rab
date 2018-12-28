import { connect } from 'react-redux'

import { State } from '../../redux'
import { increment, decrement, incrementIfOdd, incrementAsync } from '../../redux/modules/counter'
import Counter from '../../components/Counter'

export interface StateProps {
  value: number
}

export interface DispatchProps {
  _increment: typeof increment
  _decrement: typeof decrement
  _incrementIfOdd: typeof incrementIfOdd
  _incrementAsync: typeof incrementAsync
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
