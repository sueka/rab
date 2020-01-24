import { call, put, select } from 'redux-saga/effects'

import delay from '~/lib/delay'
import prsg from '~/lib/prsg'
import typed from '~/lib/typed'
import container from '~/container.dev'

import { RESET, INCREMENT_IF_ODD, INCREMENT_ASYNC, INCREMENT, DECREMENT, CounterState, reset, incrementIfOdd, incrementAsync, increment, decrement, selectCount, CounterService, createCounterReducer } from './counter'

describe('action creators', () => {
  describe('reset', () => {
    it('should return a reset action', () => {
      expect(reset()).toEqual({
        type: RESET,
      })
    })
  })

  describe('incrementIfOdd', () => {
    it('should return an increment if odd action', () => {
      expect(incrementIfOdd()).toEqual({
        type: INCREMENT_IF_ODD,
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

describe('CounterService', () => {
  const counterService = container.resolve(CounterService)

  test('incrementIfOddSaga', () => {
    describe('with odd value', () => {
      const it = counterService.incrementIfOddSaga()

      expect(it.next().value).toEqual(select(selectCount))
      expect(it.next(1).value).toEqual(put(increment()))
      expect(it.next().done).toBeTruthy()
    })

    describe('with negative odd value', () => {
      const it = counterService.incrementIfOddSaga()

      expect(it.next().value).toEqual(select(selectCount))
      expect(it.next(-1).value).toEqual(put(increment()))
      expect(it.next().done).toBeTruthy()
    })

    describe('with even value', () => {
      const it = counterService.incrementIfOddSaga()

      expect(it.next().value).toEqual(select(selectCount))
      expect(it.next(2).done).toBeTruthy()
    })
  })

  describe('incrementAsyncSaga', () => {
    const it = counterService.incrementAsyncSaga(incrementAsync(1000))

    expect(it.next().value).toEqual(call(delay, 1000))
    expect(it.next().value).toEqual(put(increment()))
  })
})

describe('reducer', () => {
  const initialState: CounterState = {
    count: 0,
  }

  const counterReducer = createCounterReducer(initialState)

  it('should pass assertReducerShape', () => {
    expect(counterReducer(undefined, {
      type: typed<[string]>`@@react-app-prototype/counter.spec/${ prsg() }`,
    })).toEqual(initialState)
  })

  it('should handle RESET', () => {
    expect(counterReducer({ count: 1 }, reset())).toEqual(initialState)
  })

  it('should handle INCREMENT_IF_ODD', () => {
    expect(counterReducer({ count: 1 }, incrementIfOdd())).toEqual({ count: 1 })
  })

  it('should handle INCREMENT_ASYNC', () => {
    expect(counterReducer({ count: 1 }, incrementAsync(Math.random()))).toEqual({ count: 1 })
  })

  it('should handle INCREMENT', () => {
    expect(counterReducer({ count: 1 }, increment())).toEqual({ count: 2 })
  })

  it('should handle DECREMENT', () => {
    expect(counterReducer({ count: 1 }, decrement())).toEqual({ count: 0 })
  })
})
