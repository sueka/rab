import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { State } from '../../redux'
import { HttpClientActionDispatcher } from '../../redux/modules/httpClient'
import Info, { StateProps, DispatchProps } from '../../components/Info'

const mapStateToProps = ({ httpClient: { results } }: State): StateProps => ({
  results,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchedActions: new HttpClientActionDispatcher(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)
