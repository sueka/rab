import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import { delay } from '../../lib/commonFunctions'
import { ActionHandler } from '../../types/reduxTypes'

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

const counterActionTypes = [
  RESET,
  NOP,
  INCREMENT,
  DECREMENT,
  INCREMENT_ASYNC,
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

export type CounterAction =
  | ResetAction
  | NopAction
  | IncrementAction
  | DecrementAction
  | IncrementAsyncAction

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

//
//
//   _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|
// _|_|      _|    _|  _|    _|  _|    _|  _|_|
//     _|_|  _|    _|  _|    _|  _|    _|      _|_|
// _|_|_|      _|_|_|    _|_|_|    _|_|_|  _|_|_|
//                           _|
//                       _|_|

export /* for testing */ function* incrementAsyncSaga({ payload: { ms } }: IncrementAsyncAction): SagaIterator {
  yield call(delay, ms)
  yield put(increment())
}

export function* counterSaga(): SagaIterator {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga)
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
// _|                                  _|  _|
// _|_|_|      _|_|_|  _|_|_|      _|_|_|  _|    _|_|    _|  _|_|    _|_|_|
// _|    _|  _|    _|  _|    _|  _|    _|  _|  _|_|_|_|  _|_|      _|_|
// _|    _|  _|    _|  _|    _|  _|    _|  _|  _|        _|            _|_|
// _|    _|    _|_|_|  _|    _|    _|_|_|  _|    _|_|_|  _|        _|_|_|
//
//

type CounterActionHandler<A extends CounterAction> = ActionHandler<CounterState, A>

const handleNop: CounterActionHandler<NopAction> = (state) => state

const handleIncrement: CounterActionHandler<IncrementAction> = ({ count }) => ({
  count: count + 1,
})

const handleDecrement: CounterActionHandler<DecrementAction> = ({ count }) => ({
  count: count - 1,
})

const handleIncrementAsync: CounterActionHandler<IncrementAsyncAction> = (state) => state

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
    case NOP: return handleNop(state, action)
    case INCREMENT: return handleIncrement(state, action)
    case DECREMENT: return handleDecrement(state, action)
    case INCREMENT_ASYNC: return handleIncrementAsync(state, action)
  }
}
