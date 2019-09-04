import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import IntlProvider from 'src/components/IntlProvider'
import LocaleSelect from '.'

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
