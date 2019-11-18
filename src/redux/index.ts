import { Action as AnyAction, Reducer, combineReducers } from 'redux'
import { SagaIterator } from 'redux-saga'
import { spawn } from 'redux-saga/effects'
import { History } from 'history'
import { RouterState, LocationChangeAction, connectRouter } from 'connected-react-router'
import { injectable, inject } from 'inversify'

import { ChessState, ChessAction, createChessReducer } from './modules/chess'
import { CounterState, CounterAction, CounterService, createCounterReducer } from './modules/counter'
import { IoState, IoAction, IoService, createIoReducer } from './modules/io'
import { LocaleSelectorState, LocaleSelectorAction, LocaleSelectorService, createLocaleSelectorReducer } from './modules/localeSelector'
import { ReminderState, ReminderAction, ReminderService, createReminderReducer } from './modules/reminder'

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

import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import ja from 'react-intl/locale-data/ja'

addLocaleData(en)
addLocaleData(ja)

@injectable()
export class Service {
  @inject(CounterService) private counterService!: CounterService
  @inject(IoService) private ioService!: IoService
  @inject(LocaleSelectorService) private localeSelectorService!: LocaleSelectorService
  @inject(ReminderService) private reminderService!: ReminderService

  public *rootSaga(): SagaIterator {
    yield spawn([this.counterService, this.counterService.rootSaga])
    yield spawn([this.ioService, this.ioService.rootSaga])
    yield spawn([this.localeSelectorService, this.localeSelectorService.rootSaga])
    yield spawn([this.reminderService, this.reminderService.rootSaga])
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
