import { connect } from 'react-redux'

import { State } from '../../redux'
import IntlProvider, { StateProps } from '../../components/IntlProvider'

const mapStateToProps = ({ localeSelector: { locale, messages } }: State): StateProps => ({
  locale,
  messages,
})

export default connect(mapStateToProps)(IntlProvider)
