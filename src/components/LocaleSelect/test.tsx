import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import IntlProvider from '~/lib/components/IntlProvider'
import { LocaleSelect } from '.'

test('LocaleSelect', () => {
  const selectLocale = jest.fn()

  const { container, getByTestId } = render(
    <IntlProvider availableLocales={ ['en', 'ja'] } locale="en">
      <LocaleSelect
        locale="en"
        selectLocale={ selectLocale }
      />
    </IntlProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  fireEvent.change(getByTestId('localeSelect'), { target: { value: 'ja' }})
  expect(selectLocale).toHaveBeenCalledTimes(1)
  expect(selectLocale).toHaveBeenCalledWith('ja')
})
