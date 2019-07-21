import { connect } from 'react-redux'

import { State } from 'src/redux'
import { reset, increment, decrement, incrementIfOdd, incrementAsync } from 'src/redux/modules/counter'
import Counter, { StateProps, DispatchProps } from 'src/components/Counter'

const mapStateToProps = ({ counter: { count } }: State): StateProps => ({
  value: count,
})

const mapDispatchToProps: DispatchProps = {
  reset,
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
