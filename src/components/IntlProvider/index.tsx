import React from 'react'
import { connect } from 'react-redux'

import IntlProvider, { OwnProps, StateProps } from '~/lib/components/IntlProvider'
import { State } from '~/redux'

const mapStateToProps = ({ localeSelector: { locale, formats, messages } }: State, {}: React.PropsWithChildren<OwnProps>): StateProps => ({
  locale,
  formats,
  messages,
})

export default connect(mapStateToProps)(IntlProvider)
