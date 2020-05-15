/* tslint:disable:no-import-side-effect */

import * as dotenv from 'dotenv'
import 'jest-canvas-mock'
import 'reflect-metadata'

jest.mock('uuid', () => ({
  v4() {
    return 'stub uuid'
  },
}))

dotenv.config()
