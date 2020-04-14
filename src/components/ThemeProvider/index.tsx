import React, { useMemo, useState } from 'react'

import { ThemeProvider as OriginalThemeProvider } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import configureTheme from '~/configureTheme'
import ThemeProviderContext from '~/contexts/ThemeProviderContext'

const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const [dark, setDark] = useState(useMediaQuery('(prefers-color-scheme: dark)'))

  const theme = useMemo(() => configureTheme({ dark }), [dark])

  return (
    <OriginalThemeProvider theme={ theme }>
      <ThemeProviderContext.Provider value={ { dark, setDark } }>
        { children }
      </ThemeProviderContext.Provider>
    </OriginalThemeProvider>
  )
}

export default ThemeProvider
