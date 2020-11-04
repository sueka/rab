import React, { useContext, useMemo, useState } from 'react'

import { ThemeProvider as OriginalThemeProvider } from '@material-ui/core/styles'

import configureTheme from '~/configureTheme'
import ThemeProviderContext from '~/contexts/ThemeProviderContext'
import IntlProviderContext from '~/lib/contexts/IntlProviderContext'

interface ThemeProviderProps {
  defaultDark: boolean
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultDark }) => {
  const { dir } = useContext(IntlProviderContext)

  const [dark, setDark] = useState<boolean | null>(null)

  const theme = useMemo(() => configureTheme({ direction: dir ?? undefined, dark: dark ?? defaultDark }), [dir, dark, defaultDark])

  return (
    <OriginalThemeProvider theme={ theme }>
      <ThemeProviderContext.Provider value={ { dark: dark ?? defaultDark, setDark } }>
        { children }
      </ThemeProviderContext.Provider>
    </OriginalThemeProvider>
  )
}

export default ThemeProvider
