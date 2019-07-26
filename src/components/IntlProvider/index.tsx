import * as React from 'react'
import { IntlProvider as OriginalIntlProvider } from 'react-intl'

export type StateProps = Pick<OriginalIntlProvider.Props, 'locale' | 'formats' | 'messages'>

type Props =
  & StateProps

// TODO: intl context でない要素を re-render しないようにする。 https://github.com/formatjs/react-intl/issues/234#issuecomment-163366518 によると現時点では難しいらしい。
// cf. https://github.com/formatjs/react-intl/issues/371#issuecomment-275703796
const IntlProvider: React.FunctionComponent<Props> = (props) => (
  <OriginalIntlProvider key={ props.locale } { ...props } />
)

export default IntlProvider
