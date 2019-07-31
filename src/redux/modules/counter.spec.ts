import { call, put, select, takeEvery } from 'redux-saga/effects'

import delay from 'src/lib/delay'

import {
  RESET, NOP, INCREMENT, DECREMENT, INCREMENT_ASYNC, SET_COUNT,
  CounterState,
  reset, nop, increment, decrement, incrementAsync, incrementIfOdd, setCount,
  selectCount,
  incrementSaga, decrementSaga, incrementAsyncSaga, counterSaga,
  createCounterReducer,
} from './counter'

describe('action creators', () => {
  describe('reset', () => {
    it('should return a reset action', () => {
      expect(reset()).toEqual({
        type: RESET,
      })
    })
  })

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

  describe('incrementAsync', () => {
    it('should return an increment async action', () => {
      expect(incrementAsync(1000)).toEqual({
        type: INCREMENT_ASYNC,
        payload: {
          ms: 1000,
        },
      })
    })
  })

  describe('incrementIfOdd', () => {
    it('should return a nop action', () => {
      expect(incrementIfOdd(0)).toEqual(nop())
    })

    it('should return an increment action', () => {
      expect(incrementIfOdd(1)).toEqual(increment())
    })
  })

  describe('setCount', () => {
    it('should return a set count action', () => {
      expect(setCount(10)).toEqual({
        type: SET_COUNT,
        payload: {
          count: 10,
        },
      })
    })
  })
})

describe('incrementSaga', () => {
  const it = incrementSaga()

  expect(it.next().value).toEqual(select(selectCount))
  expect(it.next(0).value).toEqual(put(setCount(1)))
})

describe('decrementSaga', () => {
  const it = decrementSaga()

  expect(it.next().value).toEqual(select(selectCount))
  expect(it.next(0).value).toEqual(put(setCount(-1)))
})

describe('incrementAsyncSaga', () => {
  const it = incrementAsyncSaga(incrementAsync(1000))

  expect(it.next().value).toEqual(call(delay, 1000))
  expect(it.next().value).toEqual(put(increment()))
})

describe('counterSaga', () => {
  const it = counterSaga()

  // TODO: 順不同にする
  expect(it.next().value).toEqual(takeEvery(INCREMENT, incrementSaga))
  expect(it.next().value).toEqual(takeEvery(DECREMENT, decrementSaga))
  expect(it.next().value).toEqual(takeEvery(INCREMENT_ASYNC, incrementAsyncSaga))
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

  it('should handle RESET', () => {
    expect(counterReducer({ count: 1 }, reset())).toEqual(initialState)
  })

  it('should handle NOP', () => {
    expect(counterReducer({ count: 1 }, nop())).toEqual({ count: 1 })
  })

  it('should handle INCREMENT', () => {
    expect(counterReducer({ count: 1 }, increment())).toEqual({ count: 1 })
  })

  it('should handle DECREMENT', () => {
    expect(counterReducer({ count: 1 }, decrement())).toEqual({ count: 1 })
  })

  it('should handle INCREMENT_ASYNC', () => {
    expect(counterReducer({ count: 1 }, incrementAsync(Math.random()))).toEqual({ count: 1 })
  })

  it('should handle SET_COUNT', () => {
    expect(counterReducer({ count: 1 }, setCount(2))).toEqual({ count: 2 })
  })
})
