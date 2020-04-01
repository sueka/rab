import 'reflect-metadata'

import { List, Map } from 'immutable'
import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { StoryDecorator } from '@storybook/react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import configureStore from '~/configureStore'
import IntlProvider from '~/lib/components/IntlProvider'
import Service, { createReducer, invariant } from '~/redux'
import container from '~/container.dev'
import formats from '../../public/formats/en.json' // tslint:disable-line:no-relative-imports
import messages from '../../public/messages/en.json' // tslint:disable-line:no-relative-imports

export const withProvider: StoryDecorator = (story) => {
  const history = createBrowserHistory()

  const reducer = createReducer(history, {
    chess: {
      board: {
        chessmen: Map(),
      },
    },
    counter: {
      count: 0,
    },
    io: {
      now: new Date,
    },
    localeSelector: {
      locale: 'en',
      formats,
      messages,
      errors: List(),
    },
    reminder: {
      tasks: List(),
      errors: Map(),
    },
  })

  const { store, sagaMiddleware } = configureStore(history, reducer, invariant, {})

  const service = container.resolve(Service)

  function rootSaga() {
    return service.rootSaga.call(service)
  }

  sagaMiddleware.run(rootSaga)

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
  <DndProvider backend={ HTML5Backend }>
    { story() }
  </DndProvider>
)

export const withIntlProvider: StoryDecorator = (story) => (
  <IntlProvider availableLocales={ ['en', 'ja'] } locale="en" formats={ formats } messages={ messages }>
    { story() }
  </IntlProvider>
)
