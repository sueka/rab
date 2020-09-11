import React, { useMemo, useState } from 'react'

import { ThemeProvider as OriginalThemeProvider } from '@material-ui/core/styles'

import configureTheme from '~/configureTheme'
import ThemeProviderContext from '~/contexts/ThemeProviderContext'

interface ThemeProviderProps {
  defaultDark: boolean
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultDark }) => {
  const [dark, setDark] = useState<boolean | null>(null)

  const theme = useMemo(() => configureTheme({ dark: dark ?? defaultDark }), [dark, defaultDark])

  return (
    <OriginalThemeProvider theme={ theme }>
      <ThemeProviderContext.Provider value={ { dark: dark ?? defaultDark, setDark } }>
        { children }
      </ThemeProviderContext.Provider>
    </OriginalThemeProvider>
  )
}

export default ThemeProvider
