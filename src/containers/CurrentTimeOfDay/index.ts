import { connect } from 'react-redux'

import { State } from '~/redux'
import CurrentTimeOfDay, { StateProps } from '~/components/CurrentTimeOfDay'

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

export default connect(mapStateToProps)(CurrentTimeOfDay)
