import { connect } from 'react-redux'

import { State } from '../../redux'
import { Call, tryToFetch } from '../../redux/modules/httpClient'
import Info from '../../components/Info'

export interface StateProps {
  calls: Call[]
}

export interface DispatchProps {
  _tryToFetch: typeof tryToFetch
}

const mapStateToProps = ({ info: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
