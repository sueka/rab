import { connect } from 'react-redux'

import { State } from '../../redux'
import Info, { StateProps } from '../../components/Info'

const mapStateToProps = ({ diContainer: { gitHubApi } }: State): StateProps => ({
  gitHubApi,
})

export default connect(mapStateToProps)(Info)
