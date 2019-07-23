import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, select, put, takeEvery } from 'redux-saga/effects'

import { delay } from 'src/lib/commonFunctions'
import { State } from 'src/redux'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface CounterState {
  count: number
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

export /* for testing */ const RESET = '@@react-app-prototype/counter/RESET'
export /* for testing */ const NOP = '@@react-app-prototype/counter/NOP'
export /* for testing */ const INCREMENT = '@@react-app-prototype/counter/INCREMENT'
export /* for testing */ const DECREMENT = '@@react-app-prototype/counter/DECREMENT'
export /* for testing */ const INCREMENT_ASYNC = '@@react-app-prototype/counter/INCREMENT_ASYNC'
export /* for testing */ const SET_COUNT = '@@react-app-prototype/counter/SET_COUNT'

const counterActionTypes = [
  RESET,
  NOP,
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
  SET_COUNT,
]

interface ResetAction extends Action<typeof RESET> {}

interface NopAction extends Action<typeof NOP> {}

interface IncrementAction extends Action<typeof INCREMENT> {}

interface DecrementAction extends Action<typeof DECREMENT> {}

interface IncrementAsyncAction extends Action<typeof INCREMENT_ASYNC> {
  payload: {
    ms: number
  }
}

interface SetCountAction extends Action<typeof SET_COUNT> {
  payload: {
    count: number
  }
}

export type CounterAction =
  | ResetAction
  | NopAction
  | IncrementAction
  | DecrementAction
  | IncrementAsyncAction
  | SetCountAction

function isCounterAction(action: Action): action is CounterAction {
  return counterActionTypes.includes(action.type)
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

export const reset = (): ResetAction => ({
  type: RESET,
})

export /* for testing */ const nop = (): NopAction => ({
  type: NOP,
})

export const increment = (): IncrementAction => ({
  type: INCREMENT,
})

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
})

export const incrementAsync = (ms: number): IncrementAsyncAction => ({
  type: INCREMENT_ASYNC,
  payload: {
    ms,
  },
})

export const incrementIfOdd = (value: number) => (value % 2 !== 0) ? increment() : nop()

export /* for testing */ const setCount = (count: number): SetCountAction => ({
  type: SET_COUNT,
  payload: {
    count,
  },
})

//
//                     _|                        _|
//   _|_|_|    _|_|    _|    _|_|      _|_|_|  _|_|_|_|    _|_|    _|  _|_|    _|_|_|
// _|_|      _|_|_|_|  _|  _|_|_|_|  _|          _|      _|    _|  _|_|      _|_|
//     _|_|  _|        _|  _|        _|          _|      _|    _|  _|            _|_|
// _|_|_|      _|_|_|  _|    _|_|_|    _|_|_|      _|_|    _|_|    _|        _|_|_|
//
//

export /* for testing */ const selectCount = ({ counter: { count } }: State) => count

//
//
//   _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|
// _|_|      _|    _|  _|    _|  _|    _|  _|_|
//     _|_|  _|    _|  _|    _|  _|    _|      _|_|
// _|_|_|      _|_|_|    _|_|_|    _|_|_|  _|_|_|
//                           _|
//                       _|_|

export /* for testing */ function* incrementSaga(): SagaIterator {
  const count: number = yield select(selectCount)

  yield put(setCount(count + 1))
}

export /* for testing */ function* decrementSaga(): SagaIterator {
  const count: number = yield select(selectCount)

  yield put(setCount(count - 1))
}

export /* for testing */ function* incrementAsyncSaga({ payload: { ms } }: IncrementAsyncAction): SagaIterator {
  yield call(delay, ms)
  yield put(increment())
}

export function* counterSaga(): SagaIterator {
  yield takeEvery(INCREMENT, incrementSaga)
  yield takeEvery(DECREMENT, decrementSaga)
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga)
}

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createCounterReducer: (initialState: CounterState) => Reducer<CounterState, Action> = (initialState) => (state = initialState, action) => {
  if (!isCounterAction(action)) {
    return state
  }

  switch (action.type) {
    case RESET: return initialState
    case NOP:
    case INCREMENT:
    case DECREMENT:
    case INCREMENT_ASYNC: return state
    case SET_COUNT: return {
      ...state,
      count: action.payload.count,
    }
  }
}
