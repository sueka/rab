import { Action, ActionCreator, Reducer } from 'redux'

export interface CounterState {
  count: number
}

export const initialCounterState: CounterState = {
  count: 0,
}

const INCREMENT = '@@reactAppPrototype/counter/INCREMENT'
const DECREMENT = '@@reactAppPrototype/counter/DECREMENT'

const counterActionTypes = [INCREMENT, DECREMENT]

interface IncrementAction extends Action {
  type: typeof INCREMENT
}

interface DecrementAction extends Action {
  type: typeof DECREMENT
}

export type CounterAction = IncrementAction | DecrementAction

export const increment: ActionCreator<IncrementAction> = () => ({
  type: INCREMENT,
})

export const decrement: ActionCreator<DecrementAction> = () => ({
  type: DECREMENT,
})

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
    case INCREMENT:
      return {
        count: count + 1,
      }
    case DECREMENT:
      return {
        count: count - 1,
      }
  }
}
