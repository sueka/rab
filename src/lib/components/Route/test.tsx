import React from 'react'
import { MemoryRouter } from 'react-router'
import { render } from '@testing-library/react'

import Route from '.'

const NonLazyComponent: React.FunctionComponent = () => <>non-lazy</>
const LazyComponent: React.FunctionComponent = React.lazy(async () => ({ default: () => <>lazy</> }))

describe('Route', () => {
  test('with no component', () => {
    const { container } = render(
      <MemoryRouter>
        <Route />
      </MemoryRouter>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with a non-lazy component', () => {
    const { container } = render(
      <MemoryRouter>
        <Route component={ NonLazyComponent } />
      </MemoryRouter>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('with a lazy component', async () => {
    const { container } = render(
      <MemoryRouter>
        <Route component={ LazyComponent } />
      </MemoryRouter>
    )

    expect(container.firstChild).toMatchSnapshot()

    await LazyComponent

    expect(container.firstChild).toMatchSnapshot()
  })
})
