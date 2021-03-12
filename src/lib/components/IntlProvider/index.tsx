import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
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

const IntlProvider: React.FC<Props> = ({ availableLocales, ...props }) => {
  const dir = useMemo(() => props.locale === 'he' ? 'rtl' : 'ltr', [props.locale]) // TODO

  // NOTE: <bdi> は Internet Explorer で動作しないが、翻訳はフォールバックされることがあるので、翻訳の書字方向をロケールから計算することはできない。
  return (
    <>
      <Helmet htmlAttributes={ { dir } } />
      <IntlProviderContext.Provider value={ { availableLocales, dir } }>
        <OriginalIntlProvider textComponent="bdi" { ...props } />
      </IntlProviderContext.Provider>
    </>
  )
}

export default IntlProvider
