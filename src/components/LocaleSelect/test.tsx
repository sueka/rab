import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { render, fireEvent } from '@testing-library/react'

import LocaleSelect from '.'

jest.mock('uuid', () => ({
  v4() {
    return 'stub uuid'
  }
}))

test('LocaleSelect', () => {
  const select = jest.fn()

  const { container, getByTestId } = render(
    <IntlProvider locale="en">
      <LocaleSelect
        availableLocales={ ['en', 'ja'] }
        locale="en"
        select={ select }
      />
    </IntlProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  fireEvent.change(getByTestId('localeSelect'), { target: { value: 'ja' }})
  expect(select).toHaveBeenCalledTimes(1)
})
