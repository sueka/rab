import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import Route from '.'

const NonLazyComponent: React.FC = () => <>non-lazy</>
const LazyComponent: React.FC = React.lazy(async () => ({ default: () => <>lazy</> }))

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

    const mutationCallback = jest.fn()
    const observer = new MutationObserver(mutationCallback)

    observer.observe(container, { childList: true })

    await waitFor(() => {
      expect(mutationCallback).toBeCalledTimes(1)
    })

    expect(container.firstChild).toMatchSnapshot()
  })
})
