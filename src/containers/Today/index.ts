import { connect } from 'react-redux'

import { State } from '~/redux'
import Today, { StateProps } from '~/components/Today'

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

export default connect(mapStateToProps)(Today)
