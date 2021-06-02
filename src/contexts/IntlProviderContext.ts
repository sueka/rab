import { createContext } from 'react'

import { Tag } from '~/languageNameSolver'

interface IntlProviderContext {
  availableLocales: Tag[] | undefined | null
  dir: Direction | undefined | null
}

export default createContext<IntlProviderContext>({
  availableLocales: null,
  dir: null,
})
