import { Action, Reducer } from 'redux'
import { SagaIterator, delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'

export interface CounterState {
  count: number
}

const NOP = '@@react-app-prototype/counter/NOP'
const INCREMENT = '@@react-app-prototype/counter/INCREMENT'
const DECREMENT = '@@react-app-prototype/counter/DECREMENT'
const INCREMENT_ASYNC = '@@react-app-prototype/counter/INCREMENT_ASYNC'

const counterActionTypes = [NOP, INCREMENT, DECREMENT, INCREMENT_ASYNC]

interface NopAction extends Action {
  type: typeof NOP
}

interface IncrementAction extends Action {
  type: typeof INCREMENT
}

interface DecrementAction extends Action {
  type: typeof DECREMENT
}

interface IncrementAsyncAction extends Action {
  type: typeof INCREMENT_ASYNC
  payload: {
    ms: number
  }
}

export type CounterAction = NopAction | IncrementAction | DecrementAction | IncrementAsyncAction

export const nop = (): NopAction => ({
  type: NOP,
})

export const increment = (): IncrementAction => ({
  type: INCREMENT,
})

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
})

export const incrementIfOdd = (value: number) => (value % 2 !== 0) ? increment() : nop()

/**
 * incrementAsync
 *
 * @param ms - delay in milliseconds
 */
export const incrementAsync = (ms: number): IncrementAsyncAction => ({
  type: INCREMENT_ASYNC,
  payload: {
    ms,
  },
})

function* incrementAsyncSaga(action: IncrementAsyncAction): SagaIterator {
  const { ms } = action.payload

  yield call(delay, ms)
  yield put(increment())
}

export function* counterSaga(): SagaIterator {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga)
}

function isCounterAction(action: Action): action is CounterAction {
  return counterActionTypes.some((counterActionType) => counterActionType === action.type)
}

export const counterReducer: Reducer<CounterState, Action> = (state, action) => {
  if (state === undefined) {
    return { count: NaN }
  }

  if (!isCounterAction(action)) {
    return state
  }

  const { count } = state

  switch (action.type) {
    case NOP:
      return state
    case INCREMENT:
      return {
        count: count + 1,
      }
    case DECREMENT:
      return {
        count: count - 1,
      }
    case INCREMENT_ASYNC:
      return state
  }
}
