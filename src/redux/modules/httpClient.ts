import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import { v4 } from 'uuid'

import { KeyValueMapObject, Json } from '../../commonTypes'
import { Method, HttpClient } from '../../lib/HttpClient'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

interface SimpleResponse {
  statusCode: number
  body: Json
}

export interface Call {
  id: string
  response: SimpleResponse | null
}

export interface HttpClientState {
  successful: boolean
  fetching: boolean
  calls: Call[]
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

const TRY_TO_FETCH = '@@react-app-prototype/httpClient/TRY_TO_FETCH'
const FETCH_SUCCESSFULLY = '@@react-app-prototype/httpClient/FETCH_SUCCESSFULLY'
const FAIL_TO_FETCH = '@@react-app-prototype/httpClient/FAIL_TO_FETCH'

const httpClientActionTypes = [TRY_TO_FETCH, FETCH_SUCCESSFULLY, FAIL_TO_FETCH]

interface TryToFetchAction extends Action<typeof TRY_TO_FETCH> {
  payload: {
    callId: string
    method: Method
    parameterizedEndpoint: string
    params: KeyValueMapObject<string>
    query: KeyValueMapObject<string>
  }
}

interface FetchSuccessfullyAction extends Action<typeof FETCH_SUCCESSFULLY> {
  payload: {
    callId: string
    response: SimpleResponse
  }
}

interface FailToFetchAction extends Action<typeof FAIL_TO_FETCH> {
  payload: {
    callId: string
  }
}

export type HttpClientAction = TryToFetchAction | FetchSuccessfullyAction | FailToFetchAction

function isHttpClientAction(action: Action): action is HttpClientAction {
  return httpClientActionTypes.some((httpClientActionType) => httpClientActionType === action.type)
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

export const tryToFetch = (method: Method, parameterizedEndpoint: string, params: KeyValueMapObject<string> = {}, query: KeyValueMapObject<string> = {}): TryToFetchAction => ({
  type: TRY_TO_FETCH,
  payload: {
    callId: v4(),
    method,
    parameterizedEndpoint,
    params,
    query,
  },
})

export const fetchSuccessfully = (callId: string, statusCode: number, body: Json): FetchSuccessfullyAction => ({
  type: FETCH_SUCCESSFULLY,
  payload: {
    callId,
    response: {
      statusCode,
      body,
    },
  },
})

export const failToFetch = (callId: string): FailToFetchAction => ({
  type: FAIL_TO_FETCH,
  payload: {
    callId,
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

function* tryToFetchSaga(action: TryToFetchAction): SagaIterator {
  const { method, parameterizedEndpoint, params, query, callId } = action.payload

  try {
    const client = new HttpClient()

    // NOTE: yield 式は型情報を保存できないので client.fetch の戻り値の型を復元する。
    const { response, body }: {
      response: Response
      body: Json
    } = yield call(client.fetch, { method, parameterizedEndpoint, params, query })

    yield put(fetchSuccessfully(callId, response.status, body))
  } catch {
    yield put(failToFetch(callId))
  }
}

export function* httpClientSaga(): SagaIterator {
  yield takeEvery(TRY_TO_FETCH, tryToFetchSaga)
}

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const httpClientReducer: Reducer<HttpClientState, Action> = (state, action) => {

  // combineReducers をごまかす。
  if (state === undefined) {
    return { successful: true, fetching: false, calls: [] }
  }

  if (!isHttpClientAction(action)) {
    return state
  }

  const { callId } = action.payload

  switch (action.type) {
    case TRY_TO_FETCH:
      return {
        ...state,
        fetching: true,
        calls: [
          ...state.calls,
          {
            id: callId,
            response: null,
          },
        ],
      }
    case FETCH_SUCCESSFULLY:
      const { response } = action.payload

      return {
        successful: true,
        fetching: false,
        calls: [
          ...state.calls.filter(({ id }) => id !== callId),
          {
            id: callId,
            response,
          },
        ],
      }
    case FAIL_TO_FETCH:
      return {
        ...state,
        successful: false,
        fetching: false,
      }
  }
}
