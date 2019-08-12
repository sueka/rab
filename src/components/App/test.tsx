import * as React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { DndProvider } from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'
import { render } from '@testing-library/react'
import createMockStore from 'redux-mock-store'

import { State } from 'src/redux'
import IntlProvider from 'src/containers/IntlProvider'
import App, { Counter, Info, Reminder } from '.'
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
`('App', ({ location }) => {
  test(`at ${ location }`, async () => {
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

    await Counter
    await Info
    await Reminder

    expect(container.firstChild).toMatchSnapshot()
  })
})
