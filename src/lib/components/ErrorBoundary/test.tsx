import React from 'react'
import { render } from '@testing-library/react'

import ErrorBoundary from '.'

const NoErrorThrowing: React.FunctionComponent = () => <>no error throwing</>
const ErrorThrowing: React.FunctionComponent = () => { throw new Error('error throwing') }
const NonErrorThrowing: React.FunctionComponent = () => {
  throw 'non-error throwing' // tslint:disable-line:no-string-throw
}

describe('ErrorBoundary', () => {
  test('without anything throwing', () => {
    const renderError = jest.fn()

    const { container } = render(
      <ErrorBoundary renderError={ renderError }>
        <NoErrorThrowing />
      </ErrorBoundary>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with an error throwing', () => {
    const renderError = jest.fn()

    const { container } = render(
      <ErrorBoundary renderError={ renderError }>
        <ErrorThrowing />
      </ErrorBoundary>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with a non-error throwing', () => {
    const renderError = jest.fn()

    expect(() => {
      render(
      <ErrorBoundary renderError={ renderError }>
          <NonErrorThrowing />
        </ErrorBoundary>
      )
    }).toThrowError()
  })
})
