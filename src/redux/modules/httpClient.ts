import { Action, Reducer } from 'redux'
import { SagaIterator } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import { Maybe } from 'tsmonad'

import { KeyValueMapObject } from '../../commonTypes'
import { Method, HttpClient } from '../../lib/HttpClient'

//
//             _|                  _|
//   _|_|_|  _|_|_|_|    _|_|_|  _|_|_|_|    _|_|
// _|_|        _|      _|    _|    _|      _|_|_|_|
//     _|_|    _|      _|    _|    _|      _|
// _|_|_|        _|_|    _|_|_|      _|_|    _|_|_|
//
//

export interface HttpClientState {
  successful: boolean
  fetching: boolean
  response: Maybe<{
    statusCode: number
    body: string
  }>
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
    method: Method
    parameterizedEndpoint: string
    params: KeyValueMapObject<string>
    query: KeyValueMapObject<string>
  }
}

interface FetchSuccessfullyAction extends Action<typeof FETCH_SUCCESSFULLY> {
  payload: {
    response: {
      statusCode: number
      body: string
    }
  }
}

interface FailToFetchAction extends Action<typeof FAIL_TO_FETCH> {}

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
    method,
    parameterizedEndpoint,
    params,
    query,
  },
})

export const fetchSuccessfully = (statusCode: number, body: string): FetchSuccessfullyAction => ({
  type: FETCH_SUCCESSFULLY,
  payload: {
    response: {
      statusCode,
      body,
    },
  },
})

export const failToFetch = (): FailToFetchAction => ({
  type: FAIL_TO_FETCH,
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
  const { method, parameterizedEndpoint, params, query } = action.payload

  try {
    const client = new HttpClient()

    const { response, body }: {
      response: Response
      body: string
    } = yield call(client.fetch, { method, parameterizedEndpoint, params, query })

    yield put(fetchSuccessfully(response.status, body))
  } catch {
    yield put(failToFetch())
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
    return { successful: true, fetching: false, response: Maybe.nothing() }
  }

  if (!isHttpClientAction(action)) {
    return state
  }

  switch (action.type) {
    case TRY_TO_FETCH:
      return {
        ...state,
        fetching: true,
      }
    case FETCH_SUCCESSFULLY:
      const { response } = action.payload

      return {
        successful: true,
        fetching: false,
        response: Maybe.just(response),
      }
    case FAIL_TO_FETCH:
      return {
        successful: false,
        fetching: false,
        response: Maybe.nothing(),
      }
  }
}
