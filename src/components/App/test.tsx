import React from 'react'
import { Provider, Omit } from 'react-redux'
import { StaticRouter } from 'react-router'
import { DndProvider } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'
import { render } from '@testing-library/react'
import createMockStore from 'redux-mock-store'

import typed from '~/lib/typed'
import { State } from '~/redux'
import IntlProvider from '~/containers/IntlProvider'
import App, { HomePage, CounterPage, InfoPage, ReminderPage } from '.'
import formats from '../../../public/formats/en.json' // tslint:disable-line:no-relative-imports

// NOTE: connected-react-router ではないので router state は不要。
const store = createMockStore<Omit<State, 'router'>>()({
  counter: {
    count: 0,
  },
  io: {
    now: new Date('2019-07-27'),
  },
  localeSelector: {
    availableLocales: [
      'en',
      'ja',
    ],
    locale: 'en',
    formats,
    messages: {},
    errors: [],
  },
  reminder: {
    tasks: [],
  },
})

describe.each`
location
${ '/' }
${ '/counter' }
${ '/info' }
${ '/reminder' }
${ '/nonexistent-path' }
`('App', ({ location }: { location: string }) => {
  test(typed<[string]>`at ${ location }`, async () => {
    const context = {}

    const { container } = render(
      <Provider store={ store }>
        <IntlProvider>
          <DndProvider backend={ TestBackend }>
            <StaticRouter context={ context } location={ location }>
              <App />
            </StaticRouter>
          </DndProvider>
        </IntlProvider>
      </Provider>
    )

    await HomePage
    await CounterPage
    await InfoPage
    await ReminderPage

    expect(container).toMatchSnapshot()
  })
})
