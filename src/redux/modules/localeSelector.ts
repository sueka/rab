import { List } from 'immutable'
import { Formats } from 'intl-messageformat'
import { inject, injectable } from 'inversify'
import { generatePath } from 'react-router'
import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { takeEvery } from '~/boni/redux-saga/effects'
import ConfigRegistry from '~/config/ConfigRegistry'
import fetch from '~/fetch'
import { Tag } from '~/languageNameSolver'
import typed from '~/typed'
import { asString, recordOf } from '~/validators/commonValidators'
import { asFormats } from '~/validators/intlValidators'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface LocaleSelectorState {
  locale: Tag
  formats: Partial<Formats>
  messages: Record<string, string>
  errors: List<Error>
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

export /* for testing */ const SELECT_LOCALE = '@@rap/localeSelector/SELECT_LOCALE'
export /* for testing */ const SET_LOCALE = '@@rap/localeSelector/SET_LOCALE'
export /* for testing */ const SET_FORMATS = '@@rap/localeSelector/SET_FORMATS'
export /* for testing */ const SET_MESSAGES = '@@rap/localeSelector/SET_MESSAGES'
export /* for testing */ const PUSH_ERROR = '@@rap/localeSelector/PUSH_ERROR'

const localeSelectorActionTypes = [
  SELECT_LOCALE,
  SET_LOCALE,
  SET_FORMATS,
  SET_MESSAGES,
  PUSH_ERROR,
]

type SelectLocaleAction = ReturnType<typeof selectLocale>
type SetLocaleAction = ReturnType<typeof setLocale>
type SetFormatsAction = ReturnType<typeof setFormats>
type SetMessagesAction = ReturnType<typeof setMessages>
type PushErrorAction = ReturnType<typeof pushError>

export type LocaleSelectorAction =
  | SelectLocaleAction
  | SetLocaleAction
  | SetFormatsAction
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

export const selectLocale = (locale: Tag) => <const> ({
  type: SELECT_LOCALE,
  payload: {
    locale,
  },
})

export /* for testing */ const setLocale = (locale: Tag) => <const> ({
  type: SET_LOCALE,
  payload: {
    locale,
  },
})

export /* for testing */ const setFormats = (formats: Partial<Formats>) => <const> ({
  type: SET_FORMATS,
  payload: {
    formats,
  },
})

export /* for testing */ const setMessages = (messages: Record<string, string>) => <const> ({
  type: SET_MESSAGES,
  payload: {
    messages,
  },
})

export /* for testing */ const pushError = (error: Error) => <const> ({
  type: PUSH_ERROR,
  payload: {
    error,
  },
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
    case SELECT_LOCALE: return state
    case SET_LOCALE: return {
      ...state,
      locale: action.payload.locale,
    }
    case SET_FORMATS: return {
      ...state,
      formats: action.payload.formats,
    }
    case SET_MESSAGES: return {
      ...state,
      messages: action.payload.messages,
    }
    case PUSH_ERROR: return {
      ...state,
      errors: state.errors.push(action.payload.error),
    }
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
export default class LocaleSelectorService {
  constructor(
    @inject('EnvVarConfig') private config: ConfigRegistry
  ) {}

  public /* for testing */ *selectLocaleSaga({ payload: { locale } }: SelectLocaleAction): SagaIterator {
    try {
      const formatsResponse: ResultType<ReturnType<typeof fetch>> = yield call(fetch, generatePath(typed<[string]>`${ this.config.get('BASE_NAME') }/formats/:locale.json`, { locale }))
      const formats: ResultType<ReturnType<typeof formatsResponse.json>> = yield call([formatsResponse, formatsResponse.json])

      const messagesResponse: ResultType<ReturnType<typeof fetch>> = yield call(fetch, generatePath(typed<[string]>`${ this.config.get('BASE_NAME') }/messages/:locale.json`, { locale }))
      const messages: ResultType<ReturnType<typeof messagesResponse.json>> = yield call([messagesResponse, messagesResponse.json])

      yield put(setFormats(asFormats(formats)))
      yield put(setMessages(recordOf(asString)(messages)))
      yield put(setLocale(locale))
    } catch (error: unknown) {
      if (error instanceof Error) {
        yield put(pushError(error))

        return
      }

      throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
    }
  }

  public *rootSaga(): SagaIterator {
    yield takeEvery(SELECT_LOCALE, [this, this.selectLocaleSaga])
  }
}
