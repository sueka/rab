import { connect } from 'react-redux'

import { State } from '../../redux'
import { tryToFetch } from '../../redux/modules/httpClient'
import Info, { StateProps, DispatchProps } from '../../components/Info'

const mapStateToProps = ({ httpClient: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  tryToFetch,
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
