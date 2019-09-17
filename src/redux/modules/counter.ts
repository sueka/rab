import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, select, put } from 'redux-saga/effects'
import { injectable } from 'inversify'

import { takeEvery } from '~/lib/boni/redux-saga/effects'
import delay from '~/lib/delay'
import { State } from '~/redux'

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
export /* for testing */ const INCREMENT_IF_ODD = '@@react-app-prototype/counter/INCREMENT_IF_ODD'
export /* for testing */ const INCREMENT_ASYNC = '@@react-app-prototype/counter/INCREMENT_ASYNC'
export /* for testing */ const INCREMENT = '@@react-app-prototype/counter/INCREMENT'
export /* for testing */ const DECREMENT = '@@react-app-prototype/counter/DECREMENT'

const counterActionTypes = [
  RESET,
  INCREMENT_IF_ODD,
  INCREMENT_ASYNC,
  INCREMENT,
  DECREMENT,
]

interface ResetAction extends Action<typeof RESET> {}

interface IncrementIfOddAction extends Action<typeof INCREMENT_IF_ODD> {}

interface IncrementAsyncAction extends Action<typeof INCREMENT_ASYNC> {
  payload: {
    ms: number
  }
}

interface IncrementAction extends Action<typeof INCREMENT> {}

interface DecrementAction extends Action<typeof DECREMENT> {}

export type CounterAction =
  | ResetAction
  | IncrementIfOddAction
  | IncrementAsyncAction
  | IncrementAction
  | DecrementAction

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

export const incrementIfOdd = (): IncrementIfOddAction => ({
  type: INCREMENT_IF_ODD,
})

export const incrementAsync = (ms: number): IncrementAsyncAction => ({
  type: INCREMENT_ASYNC,
  payload: {
    ms,
  },
})

export const increment = (): IncrementAction => ({
  type: INCREMENT,
})

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
})

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
    case INCREMENT_IF_ODD:
    case INCREMENT_ASYNC: return state
    case INCREMENT: return {
      ...state,
      count: state.count + 1,
    }
    case DECREMENT: return {
      ...state,
      count: state.count - 1,
    }
  }
}

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
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

@injectable()
export class CounterService {
  public /* for testing */ *incrementIfOddSaga(): SagaIterator {
    const count: ReturnType<typeof selectCount> = yield select(selectCount)

    if (count % 2 === 1) {
      yield put(increment())
    }
  }

  public /* for testing */ *incrementAsyncSaga({ payload: { ms } }: IncrementAsyncAction): SagaIterator {
    yield call(delay, ms)
    yield put(increment())
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(INCREMENT_IF_ODD, [this, this.incrementIfOddSaga])
    yield takeEvery(INCREMENT_ASYNC, [this, this.incrementAsyncSaga])
  }
}
