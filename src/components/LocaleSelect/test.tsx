import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import IntlProvider from '~/components/IntlProvider'
import LocaleSelect from '.'

test('LocaleSelect', () => {
  const selectLocale = jest.fn()

  const { container, getByTestId } = render(
    <IntlProvider locale="en">
      <LocaleSelect
        availableLocales={ ['en', 'ja'] }
        locale="en"
        selectLocale={ selectLocale }
      />
    </IntlProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  fireEvent.change(getByTestId('localeSelect'), { target: { value: 'ja' }})
  expect(selectLocale).toHaveBeenCalledTimes(1)
})
