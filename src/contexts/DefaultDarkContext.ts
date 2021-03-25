import { createContext } from 'react'

interface DefaultDarkContext {
  defaultDark: boolean | null | undefined
}

export default createContext<DefaultDarkContext>({
  defaultDark: null,
})
