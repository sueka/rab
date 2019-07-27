import * as React from 'react'
import { render } from '@testing-library/react'

import ErrorBoundary from '.'

const NoThrowing: React.FunctionComponent = () => <>no throwing</>
const ErrorThrowing: React.FunctionComponent = () => { throw new Error('error throwing') }
const NonErrorThrowing: React.FunctionComponent = () => { throw 'non-error throwing' }

describe('ErrorBoundary', () => {
  test('without anything throwing', () => {
    const { container } = render(
      <ErrorBoundary>
        <NoThrowing />
      </ErrorBoundary>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with an error throwing', () => {
    const { container } = render(
      <ErrorBoundary>
        <ErrorThrowing />
      </ErrorBoundary>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with a non-error throwing', () => {
    expect(() => {
      render(
        <ErrorBoundary>
          <NonErrorThrowing />
        </ErrorBoundary>
      )
    }).toThrowError()
  })
})
