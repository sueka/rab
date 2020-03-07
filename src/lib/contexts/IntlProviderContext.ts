import { createContext } from 'react'

import { Tag } from '~/lib/languageNameSolver'

interface IntlProviderContext {
  availableLocales: Tag[] | undefined | null
}

export default createContext<IntlProviderContext>({
  availableLocales: null,
})
