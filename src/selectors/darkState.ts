import { DefaultValue, selector } from 'recoil'

import appearanceThemeState from '~/atoms/appearanceThemeState'

const darkState = selector<boolean | null>({
  key: 'darkState',
  get({ get }) {
    const appearanceTheme = get(appearanceThemeState)

    switch (appearanceTheme) {
      case 'light': return false
      case 'dark': return true
      case 'auto': return null
    }
  },
  set({ set }, newDark) {
    if (newDark instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    if (newDark === null) {
      set(appearanceThemeState, 'auto')
    } else {
      set(appearanceThemeState, newDark ? 'dark' : 'light')
    }
  },
})

export default darkState
