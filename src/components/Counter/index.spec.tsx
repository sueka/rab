import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IntlProvider from '~/lib/components/IntlProvider'
import identity from '~/lib/identity'
import { incrementAsync, incrementIfOdd, selectCount } from '~/redux/modules/counter'
import Counter from '.'

jest.mock('react-redux')

jest.mock('~/redux/modules/counter', () => ({
  incrementIfOdd: jest.fn(),
  incrementAsync: jest.fn(),
}))

const useDispatchMocked = useDispatch as jest.MockedFunction<typeof useDispatch>
const useSelectorMocked = useSelector as jest.MockedFunction<typeof useSelector>

useDispatchMocked.mockImplementation(() => identity)

describe('Counter', () => {
  beforeAll(() => {
    useSelectorMocked.mockImplementation((selector) => {
      switch (selector) {
        case selectCount: return 0
      }

      throw new Error
    })
  })

  it('works', () => {
    const { container, getByTestId } = render(
      <IntlProvider availableLocales={ ['en'] } locale="en">
        <Counter />
      </IntlProvider>
    )

    expect(container.firstChild).toMatchSnapshot()

    fireEvent.click(getByTestId('incrementIfOddButton'))
    expect(incrementIfOdd).toHaveBeenCalledTimes(1)

    fireEvent.click(getByTestId('incrementAsyncButton'))
    expect(incrementAsync).toHaveBeenCalledTimes(1)
  })
})
