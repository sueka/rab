import { Action, Reducer } from 'redux'

import { UnreachableError } from '~/lib/errors'

export interface IoState {
  now: Date
}

const ioActionTypes: unknown[] = []

export type IoAction = never

function isIoAction(action: Action): action is IoAction {
  return ioActionTypes.includes(action.type)
}

export const createIoReducer: (initialState: IoState) => Reducer<IoState, Action> = (initialState) => (state = initialState, action) => {
  if (!isIoAction(action)) {
    return state
  }

  throw new UnreachableError
}
