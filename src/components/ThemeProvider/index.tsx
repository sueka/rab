import { ThemeProvider as OriginalThemeProvider } from '@material-ui/core/styles'
import React, { useContext, useMemo } from 'react'
import { useRecoilState } from 'recoil'

import configureTheme from '~/configureTheme'
import DefaultDarkContext from '~/contexts/DefaultDarkContext'
import IntlProviderContext from '~/contexts/IntlProviderContext'
import darkState from '~/selectors/darkState'

interface ThemeProviderProps {
  defaultDark: boolean
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultDark }) => {
  const { dir } = useContext(IntlProviderContext)

  const [dark] = useRecoilState(darkState)

  const theme = useMemo(() => configureTheme({ direction: dir ?? undefined, dark: dark ?? defaultDark }), [dir, dark, defaultDark])

  return (
    <OriginalThemeProvider theme={ theme }>
      <DefaultDarkContext.Provider value={ { defaultDark } }>
        { children }
      </DefaultDarkContext.Provider>
    </OriginalThemeProvider>
  )
}

export default ThemeProvider
