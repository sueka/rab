import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import { ActionHandler } from '../../types/reduxTypes'
import { Code } from '../../lib/languageNameSolver'
import fetch, { ResponseParams } from '../../lib/fetch'
import { validateAsStringRecord } from '../../lib/validators/commonValidators'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface LocaleSelectorState {
  availableLocales: Code[]
  locale: Code
  messages: Record<string, string>
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
//   _|
// _|_|_|_|  _|    _|  _|_|_|      _|_|      _|_|_|
//   _|      _|    _|  _|    _|  _|_|_|_|  _|_|
//   _|      _|    _|  _|    _|  _|            _|_|
//     _|_|    _|_|_|  _|_|_|      _|_|_|  _|_|_|
//                 _|  _|
//             _|_|    _|

export const SELECT = '@@react-app-prototype/localeSelector/SELECT'
export const SET_LOCALE = '@@react-app-prototype/localeSelector/SET_LOCALE'
export const SET_MESSAGES = '@@react-app-prototype/localeSelector/SET_MESSAGES'

const localeSelectorActionTypes = [
  SELECT,
  SET_LOCALE,
  SET_MESSAGES,
]

interface SelectAction extends Action<typeof SELECT> {
  payload: {
    locale: Code
  }
}

interface SetLocaleAction extends Action<typeof SET_LOCALE> {
  payload: {
    locale: Code
  }
}

interface SetMessagesAction extends Action<typeof SET_MESSAGES> {
  payload: {
    messages: Record<string, string>
  }
}

export type LocaleSelectorAction =
  | SelectAction
  | SetLocaleAction
  | SetMessagesAction

function isLocaleSelectorAction(action: Action): action is LocaleSelectorAction {
  return localeSelectorActionTypes.includes(action.type)
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

export const select = (locale: Code): SelectAction => ({
  type: SELECT,
  payload: {
    locale,
  },
})

const setLocale = (locale: Code): SetLocaleAction => ({
  type: SET_LOCALE,
  payload: {
    locale,
  },
})

const setMessages = (messages: Record<string, string>): SetMessagesAction => ({
  type: SET_MESSAGES,
  payload: {
    messages,
  },
})

//
//
//   _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|
// _|_|      _|    _|  _|    _|  _|    _|  _|_|
//     _|_|  _|    _|  _|    _|  _|    _|      _|_|
// _|_|_|      _|_|_|    _|_|_|    _|_|_|  _|_|_|
//                           _|
//                       _|_|

function* selectSaga({ payload: { locale } }: SelectAction) {
  try {
    const { body }: ResponseParams = yield call(fetch, {
      method: 'GET',
      parameterizedEndpoint: '/locales/:locale.json',
      params: { locale },
    })

    // TODO: cache

    yield put(setMessages(validateAsStringRecord(body)))
    yield put(setLocale(locale))
  } catch (error) {
    yield null // TODO:
  }
}

export function* localeSelectorSaga(): SagaIterator {
  yield takeEvery(SELECT, selectSaga)
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
// _|                                  _|  _|
// _|_|_|      _|_|_|  _|_|_|      _|_|_|  _|    _|_|    _|  _|_|    _|_|_|
// _|    _|  _|    _|  _|    _|  _|    _|  _|  _|_|_|_|  _|_|      _|_|
// _|    _|  _|    _|  _|    _|  _|    _|  _|  _|        _|            _|_|
// _|    _|    _|_|_|  _|    _|    _|_|_|  _|    _|_|_|  _|        _|_|_|
//
//

type LocaleSelectorActionHandler<A extends LocaleSelectorAction> = ActionHandler<LocaleSelectorState, A>

const handleSelect: LocaleSelectorActionHandler<SelectAction> = (state) => state

const handleSetLocale: LocaleSelectorActionHandler<SetLocaleAction> = (state, { payload: { locale } }) => ({
  ...state,
  locale,
})

const handleSetMessages: LocaleSelectorActionHandler<SetMessagesAction> = (state, { payload: { messages } }) => ({
  ...state,
  messages,
})

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createLocaleSelectorReducer: (initialState: LocaleSelectorState) => Reducer<LocaleSelectorState, Action> = (initialState) => (state = initialState, action) => {
  if (!isLocaleSelectorAction(action)) {
    return state
  }

  switch (action.type) {
    case SELECT: return handleSelect(state, action)
    case SET_LOCALE: return handleSetLocale(state, action)
    case SET_MESSAGES: return handleSetMessages(state, action)
  }
}
