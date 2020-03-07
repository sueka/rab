import React from 'react'
import { IntlConfig, IntlProvider as OriginalIntlProvider } from 'react-intl'

import IntlProviderContext from '~/lib/contexts/IntlProviderContext'
import { Tag } from '~/lib/languageNameSolver'

type DefaultIntlConfig = Pick<IntlConfig, 'formats' | 'messages' | 'timeZone' | 'textComponent' | 'defaultLocale' | 'defaultFormats' | 'onError'>

type OriginalIntlProviderProps = Alt.Omit<IntlConfig, keyof DefaultIntlConfig> & Partial<DefaultIntlConfig>

export interface OwnProps extends Alt.Omit<OriginalIntlProviderProps, 'locale' | 'formats' | 'messages'> {
  availableLocales: Tag[]
}

export type StateProps = Pick<OriginalIntlProviderProps, 'locale' | 'formats' | 'messages'>

type Props =
  & OwnProps
  & StateProps

// NOTE: key が無い場合、 FormattedMessage 等は re-render されるが、 useIntl の結果は更新されない。
// TODO: intl context でない要素を re-render しないようにする。 https://github.com/formatjs/react-intl/issues/234#issuecomment-163366518 によると現時点では難しいらしい。
// cf. https://github.com/formatjs/react-intl/issues/371#issuecomment-275703796
const IntlProvider: React.FunctionComponent<Props> = ({ availableLocales, ...props }) => (
  <IntlProviderContext.Provider value={ { availableLocales } }>
    <OriginalIntlProvider key={ props.locale } textComponent={ React.Fragment } { ...props } />
  </IntlProviderContext.Provider>
)

export default IntlProvider
