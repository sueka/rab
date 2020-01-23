import React from 'react'
import { connect } from 'react-redux'

import { State } from '~/redux'
import IntlProvider, { OwnProps, StateProps } from '~/lib/components/IntlProvider'

const mapStateToProps = ({ localeSelector: { locale, formats, messages } }: State, {}: React.PropsWithChildren<OwnProps>): StateProps => ({
  locale,
  formats,
  messages,
})

export default connect(mapStateToProps)(IntlProvider)
