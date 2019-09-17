import { connect } from 'react-redux'

import { State } from '~/redux'
import { reset, increment, decrement, incrementIfOdd, incrementAsync } from '~/redux/modules/counter'
import Counter, { StateProps, DispatchProps } from '~/components/Counter'

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
