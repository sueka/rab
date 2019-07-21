import { connect } from 'react-redux'

import { State } from 'src/redux'
import IntlProvider, { StateProps } from 'src/components/IntlProvider'

const mapStateToProps = ({ localeSelector: { locale, messages } }: State): StateProps => ({
  locale,
  messages,
})

export default connect(mapStateToProps)(IntlProvider)
