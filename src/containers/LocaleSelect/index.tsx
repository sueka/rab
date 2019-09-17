import { connect } from 'react-redux'

import { State } from '~/redux'
import { select } from '~/redux/modules/localeSelector'
import LocaleSelect, { StateProps, DispatchProps } from '~/components/LocaleSelect'

const mapStateToProps = ({ localeSelector: { availableLocales, locale } }: State): StateProps => ({
  availableLocales,
  locale,
})

const mapDispatchToProps: DispatchProps = {
  select,
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleSelect)
