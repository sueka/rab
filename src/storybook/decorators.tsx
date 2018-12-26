import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { StoryDecorator } from '@storybook/react'

import { configureStore, rootSaga } from '../redux'

export const providerDecorator: StoryDecorator = (story) => {
  const history = createBrowserHistory()
  const { store, sagaMiddleware } = configureStore(history)

  sagaMiddleware.run(rootSaga)

  return (
    <Provider { ...{ store } }>
      { story() }
    </Provider>
  )
}

export const memoryRouterDecorator: StoryDecorator = (story) => (
  <MemoryRouter>
    { story() }
  </MemoryRouter>
)
