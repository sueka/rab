import { render } from '@testing-library/react'
import React from 'react'
import * as reactRouter from 'react-router'

import App from '.'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  Redirect: jest.fn(() => null),
  useLocation: () => ({ pathname: '/', hash: '#/foo' }),
}))

const { Redirect: MockedRedirect } = reactRouter as jest.Mocked<typeof reactRouter>

describe('App', () => {
  describe('with #fragment', () => {
    it('should redirect to the page whose path-abempty is the fragment when the path-abempty is "/" and the fragment does exist', () => {
      const { container } = render(
        <App />
      )

      expect(container).toMatchSnapshot()
      expect(MockedRedirect).toBeCalledTimes(1)
      expect(MockedRedirect).toBeCalledWith({ to: { pathname: '/foo' } }, {})
    })
  })
})
