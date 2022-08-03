import { render } from '@testing-library/react'
import React from 'react'

import typed from '~/typed'
import ErrorBoundary from '.'

const NoErrorThrowing: React.FC = () => <>no error throwing</>
const ErrorThrowing: React.FC = () => { throw new Error('error throwing') }
const NonErrorThrowing: React.FC = () => {
  throw 'non-error throwing'
}

describe('ErrorBoundary', () => {
  const renderError = jest.fn((error: unknown) => {
    if (error instanceof Error) {
      return typed<[string]>`${ String(error) }`
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  })

  beforeEach(() => {
    renderError.mockClear()
  })

  test('without anything throwing', () => {
    const { container } = render(
      <ErrorBoundary renderError={ renderError }>
        <NoErrorThrowing />
      </ErrorBoundary>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with an error throwing', () => {
    const { container } = render(
      <ErrorBoundary renderError={ renderError }>
        <ErrorThrowing />
      </ErrorBoundary>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with a non-error throwing', () => {
    expect(() => {
      render(
        <ErrorBoundary renderError={ renderError }>
          <NonErrorThrowing />
        </ErrorBoundary>
      )
    }).toThrowError()
  })
})
