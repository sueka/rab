import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { State } from '../../redux'
import { CounterActionDispatcher } from '../../redux/modules/counter'
import Counter, { StateProps, DispatchProps } from '../../components/Counter'

const mapStateToProps = ({ counter: { count } }: State): StateProps => ({
  value: count,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchedActions: new CounterActionDispatcher(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
