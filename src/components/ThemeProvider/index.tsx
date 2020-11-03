import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { ThemeProvider as OriginalThemeProvider } from '@material-ui/core/styles'

import configureTheme from '~/configureTheme'
import ThemeProviderContext from '~/contexts/ThemeProviderContext'

interface ThemeProviderProps {
  defaultDark: boolean
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultDark }) => {
  const { locale } = useIntl()
  const direction = useMemo(() => locale === 'he' ? 'rtl' : 'ltr', [locale]) // TODO

  const [dark, setDark] = useState<boolean | null>(null)

  const theme = useMemo(() => configureTheme({ direction, dark: dark ?? defaultDark }), [direction, dark, defaultDark])

  return (
    <OriginalThemeProvider theme={ theme }>
      <ThemeProviderContext.Provider value={ { dark: dark ?? defaultDark, setDark } }>
        { children }
      </ThemeProviderContext.Provider>
    </OriginalThemeProvider>
  )
}

export default ThemeProvider
