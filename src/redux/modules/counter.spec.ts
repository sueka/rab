import { identity } from '../../commonFunctions'

import {
  NOP, INCREMENT, DECREMENT,
  CounterState,
  nop, increment, decrement,
  CounterActionDispatcher,
  createCounterReducer,
} from './counter'

describe('action creators', () => {
  describe('nop', () => {
    it('should return a nop action', () => {
      expect(nop()).toEqual({
        type: NOP,
      })
    })
  })

  describe('increment', () => {
    it('should return an increment action', () => {
      expect(increment()).toEqual({
        type: INCREMENT,
      })
    })
  })

  describe('decrement', () => {
    it('should return a decrement action', () => {
      expect(decrement()).toEqual({
        type: DECREMENT,
      })
    })
  })
})

describe('action dispatcher', () => {
  const mockFn = jest.fn(identity)

  // NOTE: Don't decompose to avoid to shadow variables.
  const dispatched = new CounterActionDispatcher(mockFn)

  beforeEach(() => {
    mockFn.mockClear()
  })

  describe('increment', () => {
    it('should return an increment action', () => {
      expect(dispatched.increment()).toEqual(increment())
    })
  })

  describe('decrement', () => {
    it('should return a decrement action', () => {
      expect(dispatched.decrement()).toEqual(decrement())
    })
  })

  describe('incrementIfOdd', () => {
    it('should return a nop action', () => {
      expect(dispatched.incrementIfOdd(0)).toEqual(nop())
    })

    it('should return an increment action', () => {
      expect(dispatched.incrementIfOdd(1)).toEqual(increment())
    })
  })

  describe('incrementAsync', () => {
    it('should return an action containing', () => {
      expect(dispatched.incrementAsync(1000)).resolves.toEqual(increment())

      // TODO: 秒数に関するテスト
      // TODO: 失敗時のテスト
    })
  })
})

describe('reducer', () => {
  const initialState: CounterState = {
    count: 0,
  }

  const counterReducer = createCounterReducer(initialState)

  it('should return the initial state', () => {
    expect(counterReducer(undefined, {
      type: '',
    })).toEqual(initialState)
  })

  it('should handle NOP', () => {
    expect(counterReducer({ count: 1 }, nop())).toEqual({ count: 1 })
  })

  it('should handle INCREMENT', () => {
    expect(counterReducer({ count: 1 }, increment())).toEqual({ count: 2 })
  })

  it('should handle DECREMENT', () => {
    expect(counterReducer({ count: 1 }, decrement())).toEqual({ count: 0 })
  })
})
