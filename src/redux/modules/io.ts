import { injectable } from 'inversify'
import { Action, Reducer } from 'redux'
import { SagaIterator, Task } from 'redux-saga'
import { call, cancel, put } from 'redux-saga/effects'

import { takeEvery } from '~/boni/redux-saga/effects'
import delay from '~/delay'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface IoState {
  now: Date
}

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|

export /* for testing */ const UPDATE_NOW = '@@rap/io/UPDATE_NOW' // TODO: Rename
export /* for testing */ const START_CLOCK = '@@rap/io/START_CLOCK'
const STOP_CLOCK = '@@rap/io/STOP_CLOCK'
export /* for testing */ const SET_NOW = '@@rap/io/SET_NOW'

const ioActionTypes = [
  UPDATE_NOW,
  START_CLOCK,
  STOP_CLOCK,
  SET_NOW,
]

type UpdateNowAction = ReturnType<typeof updateNow>
type StartClockAction = ReturnType<typeof startClock>
type StopClockAction = ReturnType<typeof stopClock>
export /* for testing */ type SetNowAction = ReturnType<typeof setNow>

export type IoAction =
  | UpdateNowAction
  | StartClockAction
  | StopClockAction
  | SetNowAction

function isIoAction(action: Action): action is IoAction {
  return ioActionTypes.includes(action.type)
}

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//                                           _|
//   _|_|_|  _|  _|_|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|        _|_|      _|_|_|_|  _|    _|    _|      _|    _|  _|_|      _|_|
// _|        _|        _|        _|    _|    _|      _|    _|  _|            _|_|
//   _|_|_|  _|          _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//

export const updateNow = () => <const> ({
  type: UPDATE_NOW,
})

export const startClock = () => <const> ({
  type: START_CLOCK,
})

export const stopClock = () => <const> ({
  type: STOP_CLOCK,
})

export /* for testing */ const setNow = (now: Date) => <const> ({
  type: SET_NOW,
  payload: {
    now,
  },
})

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createIoReducer: (initialState: IoState) => Reducer<IoState, Action> = (initialState) => (state = initialState, action) => {
  if (!isIoAction(action)) {
    return state
  }

  switch (action.type) {
    case UPDATE_NOW: return state
    case START_CLOCK: return state
    case STOP_CLOCK: return state
    case SET_NOW: return {
      ...state,
      now: action.payload.now,
    }
  }
}

//
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

@injectable()
export class IoService {
  private startClockTask: Task | null = null

  public /* for testing */ *updateNowSaga(): SagaIterator {
    yield put(setNow(new Date))
  }

  public /* for testing */ *startClockSaga(): SagaIterator {
    yield put(updateNow())

    // tslint:disable-next-line:no-loop-statement
    while (true) {
      yield call(delay, 1000 - (new Date().getMilliseconds() % 1000)) // NOTE: Edge では getMilliseconds が1000以上の値を返すことがある。

      yield put(updateNow())
    }
  }

  public /* for testing */ *stopClockSaga(): SagaIterator {
    if (this.startClockTask !== null) {
      yield cancel(this.startClockTask)

      // Resume the cancelled task
      // tslint:disable-next-line:no-object-mutation
      this.startClockTask = yield takeEvery(START_CLOCK, [this, this.startClockSaga])
    }
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(UPDATE_NOW, [this, this.updateNowSaga])
    // tslint:disable-next-line:no-object-mutation
    this.startClockTask = yield takeEvery(START_CLOCK, [this, this.startClockSaga])
    yield takeEvery(STOP_CLOCK, [this, this.stopClockSaga])
  }
}
