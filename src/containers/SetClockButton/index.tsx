import { connect } from 'react-redux'

import { updateNow } from '~/redux/modules/io'
import SetClockButton, { DispatchProps } from '~/components/SetClockButton'

const mapDispatchToProps: DispatchProps = {
  updateNow,
}

export default connect(null, mapDispatchToProps)(SetClockButton)
