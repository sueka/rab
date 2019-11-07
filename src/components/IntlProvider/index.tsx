import { connect } from 'react-redux'

import { State } from '~/redux'
import IntlProvider, { StateProps } from '~/lib/components/IntlProvider'

const mapStateToProps = ({ localeSelector: { locale, formats, messages } }: State): StateProps => ({
  locale,
  formats,
  messages,
})

export default connect(mapStateToProps)(IntlProvider)
