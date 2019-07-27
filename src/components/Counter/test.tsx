import * as React from 'react'
import { IntlProvider } from 'react-intl'
import { render, fireEvent } from '@testing-library/react'

import { doNothing } from 'src/lib/commonFunctions'
import Counter from '.'

test('Counter', () => {
  const incrementIfOdd = jest.fn()
  const incrementAsync = jest.fn()

  const { container, getByTestId } = render(
    <IntlProvider locale='en'>
      <Counter
        value={ 0 }
        reset={ doNothing }
        increment={ doNothing }
        decrement={ doNothing }
        incrementIfOdd={ incrementIfOdd }
        incrementAsync={ incrementAsync }
      />
    </IntlProvider>
  )

  expect(container.firstChild).toMatchSnapshot()

  fireEvent.click(getByTestId('incrementIfOddButton'))
  expect(incrementIfOdd).toHaveBeenCalledTimes(1)

  fireEvent.click(getByTestId('incrementAsyncButton'))
  expect(incrementAsync).toHaveBeenCalledTimes(1)
})
