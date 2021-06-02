import { render, waitForDomChange } from '@testing-library/react'
import { List, Map } from 'immutable'
import { Provider as ServiceProvider } from 'inversify-react'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { TestBackend } from 'react-dnd-test-backend'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { RecoilRoot } from 'recoil'
import createMockStore from 'redux-mock-store'

import IntlProvider from '~/components/IntlProvider'
import ThemeProvider from '~/components/ThemeProvider'
import inversifyContainer from '~/container.dev'
import useScreen from '~/hooks/useScreen'
import { State } from '~/redux'
import typed from '~/typed'
import { asFormats } from '~/validators/intlValidators'
import App from '.'

import formats from '../../../public/formats/en.json' // tslint:disable-line:no-relative-imports
import messages from '../../../public/messages/en.json' // tslint:disable-line:no-relative-imports

jest.mock('~/hooks/useScreen', () => jest.fn())

const useScreenMocked = useScreen as jest.MockedFunction<typeof useScreen>

// TODO: remove?
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
${ '/form-controls' }
${ '/info' }
${ '/paint' }
${ '/reminder' }
${ '/nonexistent-path' }
`('App', ({ location }: { location: string }) => {
  beforeAll(() => {
    useScreenMocked.mockImplementation(() => ({ width: 1366, height: 768, dpr: 1 }))
  })

  test(typed<[string]>`at ${ location }`, async () => {
    const context = {}

    const { container } = render(
      <RecoilRoot>
        <Provider store={ store }>
          <IntlProvider availableLocales={ ['en', 'he', 'ja'] }>
            <DndProvider backend={ TestBackend }>
              <StaticRouter context={ context } location={ location }>
                <ServiceProvider container={ inversifyContainer }>
                  <SnackbarProvider>
                    <ThemeProvider defaultDark={ false }>
                      <App />
                    </ThemeProvider>
                  </SnackbarProvider>
                </ServiceProvider>
              </StaticRouter>
            </DndProvider>
          </IntlProvider>
        </Provider>
      </RecoilRoot>
    )

    await waitForDomChange({ container, timeout: 15000 })

    expect(container).toMatchSnapshot()
  })
})
