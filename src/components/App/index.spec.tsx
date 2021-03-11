import { render, waitForDomChange } from '@testing-library/react'
import { List, Map } from 'immutable'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { TestBackend } from 'react-dnd-test-backend'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import createMockStore from 'redux-mock-store'

import IntlProvider from '~/components/IntlProvider'
import ThemeProvider from '~/components/ThemeProvider'
import typed from '~/lib/typed'
import { asFormats } from '~/lib/validators/intlValidators'
import { State } from '~/redux'
import App from '.'

import formats from '../../../public/formats/en.json' // tslint:disable-line:no-relative-imports
import messages from '../../../public/messages/en.json' // tslint:disable-line:no-relative-imports

// NOTE: connected-react-router ではないので router state は不要。
const store = createMockStore<Alt.Omit<State, 'router'>>()({
  chess: {
    board: {
      chessmen: Map(),
    },
  },
  counter: {
    count: 0,
  },
  io: {
    now: new Date('2019-07-27'),
  },
  localeSelector: {
    locale: 'en',
    formats: asFormats(formats),
    messages,
    errors: List(),
  },
  reminder: {
    tasks: List(),
    errors: Map(),
  },
  userAuthn: {},
})

describe.each`
location
${ '/' }
${ '/chess' }
${ '/clock' }
${ '/counter' }
${ '/info' }
${ '/paint' }
${ '/reminder' }
${ '/nonexistent-path' }
`('App', ({ location }: { location: string }) => {
  test(typed<[string]>`at ${ location }`, async () => {
    const context = {}

    const { container } = render(
      <Provider store={ store }>
        <IntlProvider availableLocales={ ['en', 'ja', 'he'] }>
          <DndProvider backend={ TestBackend }>
            <StaticRouter context={ context } location={ location }>
              <SnackbarProvider>
                <ThemeProvider defaultDark={ false }>
                  <App />
                </ThemeProvider>
              </SnackbarProvider>
            </StaticRouter>
          </DndProvider>
        </IntlProvider>
      </Provider>
    )

    await waitForDomChange({ container: container as HTMLElement }) // TODO

    expect(container).toMatchSnapshot()
  })
})
