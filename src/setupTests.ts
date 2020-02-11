/* tslint:disable:no-import-side-effect */

import dotenv from 'dotenv'
import 'reflect-metadata'

jest.mock('uuid', () => ({
  v4() {
    return 'stub uuid'
  },
}))

dotenv.config()
