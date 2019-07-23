import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

import { typed } from 'src/lib/commonFunctions'
import { Code } from 'src/lib/languageNameSolver'
import fetch, { ResponseParams } from 'src/lib/fetch'
import { validateAsStringRecord } from 'src/lib/validators/commonValidators'

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
  errors: Error[]
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
export const PUSH_ERROR = '@@react-app-prototype/localeSelector/PUSH_ERROR'

const localeSelectorActionTypes = [
  SELECT,
  SET_LOCALE,
  SET_MESSAGES,
  PUSH_ERROR,
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

interface PushErrorAction extends Action<typeof PUSH_ERROR> {
  payload: Error
  error: true
}

export type LocaleSelectorAction =
  | SelectAction
  | SetLocaleAction
  | SetMessagesAction
  | PushErrorAction

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

const pushError = (error: Error): PushErrorAction => ({
  type: PUSH_ERROR,
  payload: error,
  error: true,
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
    if (error instanceof Error) {
      yield put(pushError(error))
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }
}

export function* localeSelectorSaga(): SagaIterator {
  yield takeEvery(SELECT, selectSaga)
}

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
    case SELECT: return state
    case SET_LOCALE: return {
      ...state,
      locale: action.payload.locale,
    }
    case SET_MESSAGES: return {
      ...state,
      messages: action.payload.messages,
    }
    case PUSH_ERROR: return {
      ...state,
      errors: [
        ...state.errors,
        action.payload,
      ],
    }
  }
}
