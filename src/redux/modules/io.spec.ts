import { PutEffect, call, cancel, put } from 'redux-saga/effects'

import { takeEvery } from '~/boni/redux-saga/effects'
import container from '~/container.dev'
import delay from '~/delay'
import prsg from '~/prsg'
import typed from '~/typed'
import { IoService, IoState, SET_NOW, START_CLOCK, SetNowAction, UPDATE_NOW, createIoReducer, setNow, /* startClock, stopClock,  */updateNow } from './io'

describe('action creators', () => {
  describe('updateNow', () => {
    it('should return an update now action', () => {
      expect(updateNow()).toEqual({
        type: UPDATE_NOW,
      })
    })
  })

  describe('setNow', () => {
    it('should return a set now action', () => {
      const now = new Date('2019-11-01')

      expect(setNow(now)).toEqual({
        type: SET_NOW,
        payload: {
          now,
        },
      })
    })
  })
})

describe('IoService', () => {
  const ioService = container.resolve(IoService)

  // FIXME: Refactor
  test('updateNowSaga', async () => {
    const it = ioService.updateNowSaga()
    const actualEffect: PutEffect<SetNowAction> = it.next().value

    await delay(1000)

    const expectedEffect = put(setNow(new Date))

    expect(actualEffect.payload.action.payload.now.valueOf() + 1000).toBeCloseTo(expectedEffect.payload.action.payload.now.valueOf(), -2) // ± 50 ms

    expect(it.next().done).toBeTruthy()
  })

  test('startClockSaga', async () => {
    const it = ioService.startClockSaga()

    expect(it.next().value).toEqual(put(updateNow()))
    expect(it.next().value).toEqual(call(delay, expect.any(Number)))
    expect(it.next().value).toEqual(put(updateNow()))
    expect(it.next().value).toEqual(call(delay, expect.any(Number)))
    expect(it.next().value).toEqual(put(updateNow()))
  })

  test('stopClockSaga', async () => {
    const it = ioService.stopClockSaga()
    const rootIt = ioService.rootSaga()

    // tslint:disable-next-line:no-loop-statement
    while (rootIt.next().done === false) {
      // Silence is golden.
    }

    expect(it.next().value).toEqual(cancel())
    expect(JSON.stringify(it.next().value)).toBe(JSON.stringify(takeEvery(START_CLOCK, [ioService, ioService.startClockSaga]))) // TODO:
    expect(it.next().done).toBeTruthy()
  })
})

describe('reducer', () => {
  const initialState: IoState = {
    now: new Date,
  }

  const ioReducer = createIoReducer(initialState)

  it('should pass assertReducerShape', () => {
    expect(ioReducer(undefined, {
      type: typed<[string]>`@@rap/io.spec/${ prsg() }`,
    })).toEqual(initialState)
  })

  it('should handle UPDATE_NOW', () => {
    const now = new Date

    expect(ioReducer({ now }, updateNow())).toEqual({ now })
  })

  it('should handle SET_NOW', () => {
    const now = new Date

    expect(ioReducer(initialState, setNow(now))).toEqual({
      ...initialState,
      now,
    })
  })
})
