import { inject, injectable } from 'inversify'
import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call } from 'redux-saga/effects'

import ConfigRegistry from '~/config/ConfigRegistry'
import { takeEvery } from '~/lib/boni/redux-saga/effects'
import typed from '~/lib/typed'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export type UserAuthnState = {}

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

export /* for testing */ const REDIRECT_TO_GITHUB = '@@react-app-prototype/userAuthn/REDIRECT_TO_GITHUB'

const userAuthnActionTypes = [
  REDIRECT_TO_GITHUB,
]

type RedirectToGitHubAction = ReturnType<typeof redirectToGitHub>

export type UserAuthnAction =
  | RedirectToGitHubAction

function isUserAuthnAction(action: Action): action is UserAuthnAction {
  return userAuthnActionTypes.includes(action.type)
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

export const redirectToGitHub = () => <const> ({
  type: REDIRECT_TO_GITHUB,
})

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createUserAuthnReducer: (initialState: UserAuthnState) => Reducer<UserAuthnState, Action> = (initialState) => (state = initialState, action) => {
  if (!isUserAuthnAction(action)) {
    return state
  }

  switch (action.type) {
    case REDIRECT_TO_GITHUB: return state
  }
}

//
//                                           _|
//   _|_|_|    _|_|    _|  _|_|  _|      _|        _|_|_|    _|_|
// _|_|      _|_|_|_|  _|_|      _|      _|  _|  _|        _|_|_|_|
//     _|_|  _|        _|          _|  _|    _|  _|        _|
// _|_|_|      _|_|_|  _|            _|      _|    _|_|_|    _|_|_|
//
//

@injectable()
export default class UserAuthnService {
  constructor(
    @inject('EnvVarConfig') private config: ConfigRegistry
  ) {}

  public /* for testing */ *redirectToGitHub(): SagaIterator {
    yield call( // NOTE: Supports IE 11. See also https://github.com/redux-saga/redux-saga/issues/2076
      (...args: Parameters<typeof globalThis.location.assign>) => globalThis.location.assign(...args),
      typed<[string]>`${ this.config.get('USER_SERVICE_URL') }/redirect-to-github`
    )
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(REDIRECT_TO_GITHUB, [this, this.redirectToGitHub])
  }
}
