import { connect } from 'react-redux'

import { State } from '../../redux'
import { tryToFetch } from '../../redux/modules/httpClient'
import Info from '../../components/Info'

interface StateProps {
  calls: State['info']['calls']
}

interface DispatchProps {
  _tryToFetch: typeof tryToFetch
}

const mapStateToProps = ({ info: { calls } }: State): StateProps => ({
  calls,
})

const mapDispatchToProps: DispatchProps = {
  _tryToFetch: tryToFetch,
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
