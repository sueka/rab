import { atom } from 'recoil'

const appearanceThemeState = atom<AppearanceTheme>({
  key: 'appearanceTheme',
  default: 'device',
})

export default appearanceThemeState
