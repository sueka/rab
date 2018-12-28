import { connect } from 'react-redux'

import { State } from '../../redux'
import { increment, decrement, incrementIfOdd, incrementAsync } from '../../redux/modules/counter'
import Counter, { StateProps, DispatchProps } from '../../components/Counter'

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
