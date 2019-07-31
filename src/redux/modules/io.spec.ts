import prsg from 'src/lib/prsg'
import typed from 'src/lib/typed'

import {
  IoState,
  createIoReducer,
} from './io'

describe('reducer', () => {
  const initialState: IoState = {
    now: new Date(),
  }

  const ioReducer = createIoReducer(initialState)

  it('should pass assertReducerShape', () => {
    expect(ioReducer(undefined, {
      type: typed<[string]>`@@react-app-prototype/io.spec/${ prsg() }`,
    })).toEqual(initialState)
  })
})
