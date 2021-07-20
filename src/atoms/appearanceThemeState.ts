import { atom } from 'recoil'

const appearanceThemeState = atom<AppearanceTheme>({
  key: 'appearanceThemeState',
  default: 'device',
})

export default appearanceThemeState
