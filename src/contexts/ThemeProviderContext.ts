import { Dispatch, SetStateAction, createContext } from 'react'

interface ThemeProviderContext {
  dark: boolean | undefined | null
  setDark: Dispatch<SetStateAction<boolean | null>> | undefined | null
}

export default createContext<ThemeProviderContext>({
  dark: null,
  setDark: null,
})
