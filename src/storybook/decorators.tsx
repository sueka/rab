import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { StoryDecorator } from '@storybook/react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { IntlProvider } from 'react-intl'

import { configureStore } from '../redux'
import en from '../../locales/en.json'

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

export const withDragDropContextProvider: StoryDecorator = (story) => (
  <DragDropContextProvider backend={ HTML5Backend }>
    { story() }
  </DragDropContextProvider>
)

const messages = {
  en,
}

export const withIntlProvider: StoryDecorator = (story) => (
  <IntlProvider locale="en" messages={ messages.en }>
    { story() }
  </IntlProvider>
)
