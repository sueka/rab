import { injectable } from 'inversify'
import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { takeEvery } from '~/lib/boni/redux-saga/effects'
import fetch from '~/lib/fetch'
import { Tag } from '~/lib/languageNameSolver'
import typed from '~/lib/typed'
import { asString, recordOf } from '~/lib/validators/commonValidators'
import { asFormats } from '~/lib/validators/intlValidators'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface LocaleSelectorState {
  availableLocales: Tag[]
  locale: Tag
  formats: Formats
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

export /* for testing */ const SELECT_LOCALE = '@@react-app-prototype/localeSelector/SELECT_LOCALE'
export /* for testing */ const SET_LOCALE = '@@react-app-prototype/localeSelector/SET_LOCALE'
export /* for testing */ const SET_FORMATS = '@@react-app-prototype/localeSelector/SET_FORMATS'
export /* for testing */ const SET_MESSAGES = '@@react-app-prototype/localeSelector/SET_MESSAGES'
export /* for testing */ const PUSH_ERROR = '@@react-app-prototype/localeSelector/PUSH_ERROR'

const localeSelectorActionTypes = [
  SELECT_LOCALE,
  SET_LOCALE,
  SET_FORMATS,
  SET_MESSAGES,
  PUSH_ERROR,
]

interface SelectLocaleAction extends Action<typeof SELECT_LOCALE> {
  payload: {
    locale: Tag
  }
}

interface SetLocaleAction extends Action<typeof SET_LOCALE> {
  payload: {
    locale: Tag
  }
}

interface SetFormatsAction extends Action<typeof SET_FORMATS> {
  payload: {
    formats: Formats
  }
}

interface SetMessagesAction extends Action<typeof SET_MESSAGES> {
  payload: {
    messages: Record<string, string>
  }
}

interface PushErrorAction extends Action<typeof PUSH_ERROR> {
  payload: {
    error: Error
  }
}

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

export const selectLocale = (locale: Tag): SelectLocaleAction => ({
  type: SELECT_LOCALE,
  payload: {
    locale,
  },
})

export /* for testing */ const setLocale = (locale: Tag): SetLocaleAction => ({
  type: SET_LOCALE,
  payload: {
    locale,
  },
})

export /* for testing */ const setFormats = (formats: Formats): SetFormatsAction => ({
  type: SET_FORMATS,
  payload: {
    formats,
  },
})

export /* for testing */ const setMessages = (messages: Record<string, string>): SetMessagesAction => ({
  type: SET_MESSAGES,
  payload: {
    messages,
  },
})

export /* for testing */ const pushError = (error: Error): PushErrorAction => ({
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
      errors: [
        ...state.errors,
        action.payload.error,
      ],
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
export class LocaleSelectorService {
  public /* for testing */ *selectLocaleSaga({ payload: { locale } }: SelectLocaleAction): SagaIterator {
    try {
      const { body: formats }: ResultType<ReturnType<typeof fetch>> = yield call(fetch, {
        method: 'GET',
        parameterizedEndpoint: '/formats/:locale.json',
        params: { locale },
      })

      const { body: messages }: ResultType<ReturnType<typeof fetch>> = yield call(fetch, {
        method: 'GET',
        parameterizedEndpoint: '/messages/:locale.json',
        params: { locale },
      })

      // TODO: cache

      yield put(setFormats(asFormats(formats)))
      yield put(setMessages(recordOf(asString)(messages)))
      yield put(setLocale(locale))
    } catch (error) {
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
