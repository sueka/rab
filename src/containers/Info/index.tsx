import { connect } from 'react-redux'

import { State } from '../../redux'
import { tryToFetch } from '../../redux/modules/httpClient'
import Info, { StateProps, DispatchProps } from '../../components/Info'

const mapStateToProps = ({ info: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
