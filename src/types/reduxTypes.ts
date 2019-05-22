import { Action } from 'redux'

export type ActionHandler<S, A extends Action> = (state: S, action: A) => S
