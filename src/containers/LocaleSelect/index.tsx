import { connect } from 'react-redux'

import { State } from 'src/redux'
import { select } from 'src/redux/modules/localeSelector'
import LocaleSelect, { StateProps, DispatchProps } from 'src/components/LocaleSelect'

const mapStateToProps = ({ localeSelector: { availableLocales, locale } }: State): StateProps => ({
  availableLocales,
  locale,
})

const mapDispatchToProps: DispatchProps = {
  select,
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelect)
