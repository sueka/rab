import { DecoratorFn } from '@storybook/react'
import { createBrowserHistory } from 'history'
import { List, Map } from 'immutable'
import * as React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'

import configureStore from '~/configureStore'
import container from '~/container.dev'
import IntlProvider from '~/lib/components/IntlProvider'
import Service, { createReducer, invariant } from '~/redux'

import formats from '../../public/formats/en.json' // tslint:disable-line:no-relative-imports
import messages from '../../public/messages/en.json' // tslint:disable-line:no-relative-imports

export const withProvider: DecoratorFn = (story) => {
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
    userAuthn: {},
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

export const withMemoryRouter: DecoratorFn = (story) => (
  <MemoryRouter>
    { story() }
  </MemoryRouter>
)

export const withDragDropContextProvider: DecoratorFn = (story) => (
  <DndProvider backend={ HTML5Backend }>
    { story() }
  </DndProvider>
)

export const withIntlProvider: DecoratorFn = (story) => (
  <IntlProvider availableLocales={ ['en', 'ja', 'he'] } locale="en" formats={ formats } messages={ messages }>
    { story() }
  </IntlProvider>
)
