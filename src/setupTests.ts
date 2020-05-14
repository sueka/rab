/* tslint:disable:no-import-side-effect */

import * as dotenv from 'dotenv'
import 'reflect-metadata'
import 'jest-canvas-mock'

jest.mock('uuid', () => ({
  v4() {
    return 'stub uuid'
  },
}))

dotenv.config()
