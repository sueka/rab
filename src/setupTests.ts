/* tslint:disable:no-import-side-effect */

import * as dotenv from 'dotenv'
import 'jest-canvas-mock'
import fetchMock from 'jest-fetch-mock'
import 'reflect-metadata'

import './lib/extensions/Array/Array.prototype.hashCode'
import './lib/extensions/Boolean/Boolean.prototype.hashCode'
import './lib/extensions/Number/Number.prototype.hashCode'
import './lib/extensions/String/String.prototype.hashCode'

// tslint:disable-next-line:no-any no-object-mutation
globalThis.SpeechRecognition = class { addEventListener = jest.fn() } as any

jest.mock('uuid', () => ({
  v4() {
    return '00000000-0000-4000-0000-000000000000' // TODO
  },
}))

dotenv.config()

fetchMock.enableMocks()
