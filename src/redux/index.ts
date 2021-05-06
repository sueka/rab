import { LocationChangeAction, RouterState, connectRouter } from 'connected-react-router'
import { History } from 'history'
import { inject, injectable } from 'inversify'
import { Action as AnyAction, Reducer, combineReducers } from 'redux'
import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import combineInvariants from '~/lib/middleware/invariantMiddleware/combineInvariants'
import { ChessAction, ChessService, ChessState, chessInvariant, createChessReducer } from './modules/chess'
import { CounterAction, CounterService, CounterState, counterInvariant, createCounterReducer } from './modules/counter'
import { IoAction, IoService, IoState, createIoReducer } from './modules/io'
import LocaleSelectorService, { LocaleSelectorAction, LocaleSelectorState, createLocaleSelectorReducer } from './modules/localeSelector'
import ReminderService, { ReminderAction, ReminderState, createReminderReducer } from './modules/reminder'
import UserAuthnService, { UserAuthnAction, UserAuthnState, createUserAuthnReducer } from './modules/userAuthn'

export interface State {
  router: RouterState
  chess: ChessState
  counter: CounterState
  io: IoState
  localeSelector: LocaleSelectorState
  reminder: ReminderState
  userAuthn: UserAuthnState
}

export type Action =
  | LocationChangeAction
  | ChessAction
  | CounterAction
  | IoAction
  | LocaleSelectorAction
  | ReminderAction
  | UserAuthnAction

// NOTE: エントリーポイント (/src/index.tsx) は Service の実装を使い、 Service の実装は FooService (e.g. IoService) の実装を使い、 FooService の実装は外部 API 等（ Rap のモジュールも含む。）の実装や現実世界の状態などを使うので、これらの実装は全て同じレイヤー (Frameworks & Drivers, CA) に属するが、 Rap では、外部 API 等の実装等を DI していて、 FooService のインターフェイスをよりドメインに近いレイヤー (Application Business Rules, CA) に移動させることができるので、 Service と FooService も DI し、インターフェイス分離に備えている。
@injectable()
export default class Service {
  private chessService: ChessService
  private counterService: CounterService
  private ioService: IoService
  private localeSelectorService: LocaleSelectorService
  private reminderService: ReminderService
  private userAuthnService: UserAuthnService

  // NOTE: `@inject(Service) private service: Service` は、 `toSelf` された実装をコンストラクター引数の中で最後に `@inject` しているか、 `Service` が参照されているかのいずれでもなければ、 Service is not defined を投げる。おそらく inversify か babel-plugin-parameter-decorator がおかしい。
  constructor(
    @inject(ChessService) chessService: ChessService,
    @inject(CounterService) counterService: CounterService,
    @inject(IoService) ioService: IoService,
    @inject(LocaleSelectorService) localeSelectorService: LocaleSelectorService,
    @inject(ReminderService) reminderService: ReminderService,
    @inject(UserAuthnService) userAuthnService: UserAuthnService
  ) {
    this.chessService = chessService
    this.counterService = counterService
    this.ioService = ioService
    this.localeSelectorService = localeSelectorService
    this.reminderService = reminderService
    this.userAuthnService = userAuthnService
  }

  public *rootSaga(): SagaIterator {
    yield fork([this.chessService, this.chessService.rootSaga])
    yield fork([this.counterService, this.counterService.rootSaga])
    yield fork([this.ioService, this.ioService.rootSaga])
    yield fork([this.localeSelectorService, this.localeSelectorService.rootSaga])
    yield fork([this.reminderService, this.reminderService.rootSaga])
    yield fork([this.userAuthnService, this.userAuthnService.rootSaga])
  }
}

export const createReducer = (history: History, initialState: Alt.Omit<State, 'router'>) => combineReducers<State, Action>({
  router: connectRouter(history) as Reducer<RouterState, AnyAction>, // TODO
  chess: createChessReducer(initialState.chess),
  counter: createCounterReducer(initialState.counter),
  io: createIoReducer(initialState.io),
  localeSelector: createLocaleSelectorReducer(initialState.localeSelector),
  reminder: createReminderReducer(initialState.reminder),
  userAuthn: createUserAuthnReducer(initialState.userAuthn),
})

export const invariant = combineInvariants<State>({
  chess: chessInvariant,
  counter: counterInvariant,
})
