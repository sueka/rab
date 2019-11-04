import { connect } from 'react-redux'

import { State } from '~/redux'
import { updateNow } from '~/redux/modules/io'
import Clock, { StateProps, DispatchProps } from '~/components/Clock'

const mapStateToProps = ({ io: { now } }: State): StateProps => ({
  now,
})

const mapDispatchToProps: DispatchProps = {
  updateNow,
}

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
