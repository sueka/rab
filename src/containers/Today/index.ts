import { connect } from 'react-redux'

import { State } from 'src/redux'
import Today, { StateProps } from 'src/components/Today'

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

export default connect(mapStateToProps)(Today)
