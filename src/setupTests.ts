/* tslint:disable:no-import-side-effect */

import * as dotenv from 'dotenv'
import 'jest-canvas-mock'
import fetchMock from 'jest-fetch-mock'
import 'reflect-metadata'

import '~/extensions/Array/Array.prototype.hashCode'
import '~/extensions/Boolean/Boolean.prototype.hashCode'
import '~/extensions/Number/Number.prototype.hashCode'
import '~/extensions/String/String.prototype.hashCode'

jest.setTimeout(15000)

jest.mock('uuid', () => ({
  v4() {
    return '00000000-0000-4000-0000-000000000000' // TODO
  },
}))

dotenv.config()

fetchMock.enableMocks()
