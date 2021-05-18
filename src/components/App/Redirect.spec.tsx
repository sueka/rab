// TODO: index.spec.tsx に統合する?
// NOTE: useRecoilState をモックせずに RecoilRoot を使うと、 Recoil state の初期化、更新によって re-render が発生し、 <Redirect> が2回以上 render される。これを回避するために useRecoilState をモックし、 Recoil の state が使われないようにしている。別の解決策として、 Redirect のモック実装で useLocation のモック実装を変更する方法がある。

import { render } from '@testing-library/react'
import { Provider as ServiceProvider } from 'inversify-react'
import React from 'react'
import reactRouter, { Redirect } from 'react-router'
import { useRecoilCallback, useRecoilState } from 'recoil'

import inversifyContainer from '~/container.dev'
import App from '.'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any), // tslint:disable-line:no-any
  Redirect: jest.fn(() => null),
  useLocation: jest.fn(),
}))

jest.mock('recoil', () => ({
  ...(jest.requireActual('recoil') as any), // tslint:disable-line:no-any
  useRecoilState: jest.fn(),
  useRecoilCallback: jest.fn(),
}))

const mockedReactRouter = reactRouter as jest.Mocked<typeof reactRouter>

describe('App', () => {
  describe('with #fragment', () => {
    beforeAll(() => {
      // tslint:disable-next-line:semicolon
      ;(useRecoilState as jest.MockedFunction<typeof useRecoilState>).mockImplementationOnce(() => [[], jest.fn()])
      ;(useRecoilCallback as jest.MockedFunction<typeof useRecoilCallback>).mockImplementationOnce(() => jest.fn())
    })

    it('should redirect to the page whose path-abempty is the fragment when the path-abempty is "/" and the fragment exists', () => {
      mockedReactRouter.useLocation.mockImplementationOnce(() => ({ pathname: '/', hash: '#/foo', search: '', state: undefined }))

      const { container } = render(
        <ServiceProvider container={ inversifyContainer }>
          <App />
        </ServiceProvider>
      )

      expect(container).toMatchSnapshot()
      expect(Redirect).toBeCalledTimes(1)
      expect(Redirect).toBeCalledWith({ to: { pathname: '/foo' } }, {})
    })
  })
})
