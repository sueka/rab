/* tslint:disable:no-import-side-effect */

import * as dotenv from 'dotenv'
import 'jest-canvas-mock'
import fetchMock from 'jest-fetch-mock'
import 'reflect-metadata'

import '~/lib/extensions/Array/Array.prototype.hashCode'
import '~/lib/extensions/Boolean/Boolean.prototype.hashCode'
import '~/lib/extensions/Number/Number.prototype.hashCode'
import '~/lib/extensions/String/String.prototype.hashCode'

jest.mock('uuid', () => ({
  v4() {
    return '00000000-0000-4000-0000-000000000000' // TODO
  },
}))

// Notification はウェブにしか無いので、適当にモックする。
Object.defineProperty(globalThis, 'Notification', {
  value: jest.fn(),
})

dotenv.config()

fetchMock.enableMocks()
