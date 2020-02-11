/* tslint:disable:no-import-side-effect */

import 'reflect-metadata'

jest.mock('uuid', () => ({
  v4() {
    return 'stub uuid'
  },
}))
