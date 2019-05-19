import { IntlProvider } from 'react-intl'

export type StateProps = Pick<IntlProvider.Props, 'locale' | 'messages'>

export default IntlProvider
