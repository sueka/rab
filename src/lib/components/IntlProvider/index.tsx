import React from 'react'
import { IntlConfig, IntlProvider as OriginalIntlProvider } from 'react-intl'

type DefaultIntlConfig = Pick<IntlConfig, 'formats' | 'messages' | 'timeZone' | 'textComponent' | 'defaultLocale' | 'defaultFormats' | 'onError'>

type OriginalIntlProviderProps = Alt.Omit<IntlConfig, keyof DefaultIntlConfig> & Partial<DefaultIntlConfig>

export type OwnProps = Alt.Omit<OriginalIntlProviderProps, 'locale' | 'formats' | 'messages'>

export type StateProps = Pick<OriginalIntlProviderProps, 'locale' | 'formats' | 'messages'>

type Props = OriginalIntlProviderProps

// TODO: intl context でない要素を re-render しないようにする。 https://github.com/formatjs/react-intl/issues/234#issuecomment-163366518 によると現時点では難しいらしい。
// cf. https://github.com/formatjs/react-intl/issues/371#issuecomment-275703796
const IntlProvider: React.FunctionComponent<Props> = (props) => (
  <OriginalIntlProvider key={ props.locale } textComponent={ React.Fragment } { ...props } />
)

export default IntlProvider
