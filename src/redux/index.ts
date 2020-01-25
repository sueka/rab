import { LocationChangeAction, RouterState, connectRouter } from 'connected-react-router'
import { History } from 'history'
import { inject, injectable } from 'inversify'
import { Action as AnyAction, Reducer, combineReducers } from 'redux'
import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import { ChessAction, ChessState, createChessReducer } from './modules/chess'
import { CounterAction, CounterService, CounterState, createCounterReducer } from './modules/counter'
import { IoAction, IoService, IoState, createIoReducer } from './modules/io'
import { LocaleSelectorAction, LocaleSelectorService, LocaleSelectorState, createLocaleSelectorReducer } from './modules/localeSelector'
import { ReminderAction, ReminderService, ReminderState, createReminderReducer } from './modules/reminder'

export interface State {
  router: RouterState
  chess: ChessState
  counter: CounterState
  io: IoState
  localeSelector: LocaleSelectorState
  reminder: ReminderState
}

export type Action =
  | LocationChangeAction
  | ChessAction
  | CounterAction
  | IoAction
  | LocaleSelectorAction
  | ReminderAction

@injectable()
export class Service {
  constructor(
    @inject(CounterService) private counterService: CounterService,
    @inject(IoService) private ioService: IoService,
    @inject(LocaleSelectorService) private localeSelectorService: LocaleSelectorService,
    @inject(ReminderService) private reminderService: ReminderService
  ) {}

  public *rootSaga(): SagaIterator {
    yield fork([this.counterService, this.counterService.rootSaga])
    yield fork([this.ioService, this.ioService.rootSaga])
    yield fork([this.localeSelectorService, this.localeSelectorService.rootSaga])
    yield fork([this.reminderService, this.reminderService.rootSaga])
  }
}

export const createReducer = (history: History, initialState: Alt.Omit<State, 'router'>) => combineReducers<State, Action>({
  router: connectRouter(history) as Reducer<RouterState, AnyAction>, // TODO
  chess: createChessReducer(initialState.chess),
  counter: createCounterReducer(initialState.counter),
  io: createIoReducer(initialState.io),
  localeSelector: createLocaleSelectorReducer(initialState.localeSelector),
  reminder: createReminderReducer(initialState.reminder),
})
