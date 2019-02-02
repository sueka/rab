import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { StoryDecorator } from '@storybook/react'

import { configureStore } from '../redux'

export const withProvider: StoryDecorator = (story) => {
  const history = createBrowserHistory()
  const store = configureStore(history)

  return (
    <Provider { ...{ store } }>
      { story() }
    </Provider>
  )
}

export const withMemoryRouter: StoryDecorator = (story) => (
  <MemoryRouter>
    { story() }
  </MemoryRouter>
)
