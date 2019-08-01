import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { StoryDecorator } from '@storybook/react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { IntlProvider } from 'react-intl'

import { Service, configureStore } from 'src/redux'
import container from 'src/container.dev'
import formats from '../../public/formats/en.json' // tslint:disable-line:no-relative-imports
import messages from '../../public/messages/en.json' // tslint:disable-line:no-relative-imports

export const withProvider: StoryDecorator = (story) => {
  const history = createBrowserHistory()
  const { store, sagaMiddleware } = configureStore(history)

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
  <DragDropContextProvider backend={ HTML5Backend }>
    { story() }
  </DragDropContextProvider>
)

export const withIntlProvider: StoryDecorator = (story) => (
  <IntlProvider locale="en" formats={ formats } messages={ messages }>
    { story() }
  </IntlProvider>
)
