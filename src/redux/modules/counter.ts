import { Action, ActionCreator, Reducer } from 'redux'
import { SagaIterator, delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'

export interface CounterState {
  count: number
}

export const initialCounterState: CounterState = {
  count: 0,
}

const NONE = '@@reactAppPrototype/counter/NONE'
const INCREMENT = '@@reactAppPrototype/counter/INCREMENT'
const DECREMENT = '@@reactAppPrototype/counter/DECREMENT'
const INCREMENT_ASYNC = '@@reactAppPrototype/counter/INCREMENT_ASYNC'

const counterActionTypes = [NONE, INCREMENT, DECREMENT, INCREMENT_ASYNC]

interface NoneAction extends Action {
  type: typeof NONE
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

export type CounterAction = NoneAction | IncrementAction | DecrementAction | IncrementAsyncAction

export const none: ActionCreator<NoneAction> = () => ({
  type: NONE,
})

export const increment: ActionCreator<IncrementAction> = () => ({
  type: INCREMENT,
})

export const decrement: ActionCreator<DecrementAction> = () => ({
  type: DECREMENT,
})

export const incrementIfOdd: ActionCreator<NoneAction | IncrementAction> = (value: number) => (
  (value % 2 !== 0) ? increment() : none()
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
    case NONE:
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
