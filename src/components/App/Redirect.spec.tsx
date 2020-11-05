// TODO: index.spec.tsx に統合する?

import { render } from '@testing-library/react'
import React from 'react'
import reactRouter, { Redirect } from 'react-router'

import App from '.'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any), // tslint:disable-line:no-any
  Redirect: jest.fn(() => null),
  useLocation: jest.fn(),
}))

const mockedReactRouter = reactRouter as jest.Mocked<typeof reactRouter>

describe('App', () => {
  describe('with #fragment', () => {
    it('should redirect to the page whose path-abempty is the fragment when the path-abempty is "/" and the fragment exists', () => {
      mockedReactRouter.useLocation.mockImplementationOnce(() => ({ pathname: '/', hash: '#/foo', search: '', state: undefined }))

      const { container } = render(
        <App />
      )

      expect(container).toMatchSnapshot()
      expect(Redirect).toBeCalledTimes(1)
      expect(Redirect).toBeCalledWith({ to: { pathname: '/foo' } }, {})
    })
  })
})
