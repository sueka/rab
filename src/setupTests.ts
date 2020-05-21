/* tslint:disable:no-import-side-effect */

import * as dotenv from 'dotenv'
import 'jest-canvas-mock'
import 'reflect-metadata'

jest.mock('uuid', () => ({
  v4() {
    return '00000000-0000-4000-0000-000000000000' // TODO
  },
}))

dotenv.config()
