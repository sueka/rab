import * as React from 'react'
import { IntlProvider } from 'react-intl'

export type StateProps = Pick<IntlProvider.Props, 'locale' | 'messages'>

type Props =
  & StateProps

// cf. https://github.com/formatjs/react-intl/issues/371#issuecomment-275703796
const IntlProviderWrapper: React.FunctionComponent<Props> = (props) => (
  <IntlProvider key={ props.locale } { ...props } />
)

export default IntlProviderWrapper
