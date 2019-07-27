import * as React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'
import createMockStore from 'redux-mock-store'

import { State } from 'src/redux'
import IntlProvider from 'src/containers/IntlProvider'
import App from '.'
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
})

test('App', () => {
  const { container } = render(
    <Provider store={ store }>
      <IntlProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </IntlProvider>
    </Provider>
  )

  expect(container.firstChild).toMatchSnapshot()
})
