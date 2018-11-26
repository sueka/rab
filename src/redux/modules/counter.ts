import { Action, ActionCreator, Reducer } from 'redux'
import { SagaIterator, delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'

export interface CounterState {
  count: number
}

export const initialCounterState: CounterState = {
  count: 0,
}

const NOP = '@@reactAppPrototype/counter/NOP'
const INCREMENT = '@@reactAppPrototype/counter/INCREMENT'
const DECREMENT = '@@reactAppPrototype/counter/DECREMENT'
const INCREMENT_ASYNC = '@@reactAppPrototype/counter/INCREMENT_ASYNC'

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

export const nop: ActionCreator<NopAction> = () => ({
  type: NOP,
})

export const increment: ActionCreator<IncrementAction> = () => ({
  type: INCREMENT,
})

export const decrement: ActionCreator<DecrementAction> = () => ({
  type: DECREMENT,
})

export const incrementIfOdd: ActionCreator<NopAction | IncrementAction> = (value: number) => (
  (value % 2 !== 0) ? increment() : nop()
)

/**
 * incrementAsync
 *
 * @param ms - delay in milliseconds
 */
export const incrementAsync: ActionCreator<IncrementAsyncAction> = (ms: number) => ({
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
