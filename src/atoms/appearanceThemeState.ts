import { atom } from 'recoil'

const appearanceThemeState = atom<AppearanceTheme>({
  key: 'appearanceThemeState',
  default: 'auto',
})

export default appearanceThemeState
