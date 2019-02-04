import { Dispatch, Action, Reducer } from 'redux'

import { Json } from '../../commonTypes'
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

export interface Result {
  id: string
  response: SimpleResponse | null
}

export interface HttpClientState {
  successful: boolean
  fetching: boolean
  results: Result[]
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
    resultId: string
    method: Method
    parameterizedEndpoint: string
    params: Record<string, string>
    query: Record<string, string>
  }
}

interface FetchSuccessfullyAction extends Action<typeof FETCH_SUCCESSFULLY> {
  payload: {
    resultId: string
    response: SimpleResponse
  }
}

interface FailToFetchAction extends Action<typeof FAIL_TO_FETCH> {
  payload: {
    resultId: string
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

export const tryToFetch = (resultId: string, method: Method, parameterizedEndpoint: string, params: Record<string, string> = {}, query: Record<string, string> = {}): TryToFetchAction => ({
  type: TRY_TO_FETCH,
  payload: {
    resultId,
    method,
    parameterizedEndpoint,
    params,
    query,
  },
})

export const fetchSuccessfully = (resultId: string, statusCode: number, body: Json): FetchSuccessfullyAction => ({
  type: FETCH_SUCCESSFULLY,
  payload: {
    resultId,
    response: {
      statusCode,
      body,
    },
  },
})

export const failToFetch = (resultId: string): FailToFetchAction => ({
  type: FAIL_TO_FETCH,
  payload: {
    resultId,
  },
})

//
//                       _|      _|
//   _|_|_|    _|_|_|  _|_|_|_|        _|_|    _|_|_|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
// _|    _|  _|          _|      _|  _|    _|  _|    _|
//   _|_|_|    _|_|_|      _|_|  _|    _|_|    _|    _|
//
//
//
//       _|  _|                                  _|                _|
//   _|_|_|        _|_|_|  _|_|_|      _|_|_|  _|_|_|_|    _|_|_|  _|_|_|      _|_|    _|  _|_|
// _|    _|  _|  _|_|      _|    _|  _|    _|    _|      _|        _|    _|  _|_|_|_|  _|_|
// _|    _|  _|      _|_|  _|    _|  _|    _|    _|      _|        _|    _|  _|        _|
//   _|_|_|  _|  _|_|_|    _|_|_|      _|_|_|      _|_|    _|_|_|  _|    _|    _|_|_|  _|
//                         _|
//                         _|

export class HttpClientActionDispatcher {
  private dispatch: Dispatch

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch
  }

  public fetch = async (resultId: string, method: Method, parameterizedEndpoint: string, params: Record<string, string> = {}, query: Record<string, string> = {}) => {
    this.tryToFetch(resultId, method, parameterizedEndpoint, params, query)

    try {
      const client = new HttpClient()
      const { response, body } = await client.fetch({ method, parameterizedEndpoint, params, query })

      return this.fetchSuccessfully(resultId, response.status, body)
    } catch {
      return this.failToFetch(resultId)
    }
  }

  private tryToFetch: typeof tryToFetch = (...args) => this.dispatch(tryToFetch(...args))

  private fetchSuccessfully: typeof fetchSuccessfully = (...args) => this.dispatch(fetchSuccessfully(...args))

  private failToFetch: typeof failToFetch = (...args) => this.dispatch(failToFetch(...args))
}

//
//                           _|
// _|  _|_|    _|_|      _|_|_|  _|    _|    _|_|_|    _|_|    _|  _|_|
// _|_|      _|_|_|_|  _|    _|  _|    _|  _|        _|_|_|_|  _|_|
// _|        _|        _|    _|  _|    _|  _|        _|        _|
// _|          _|_|_|    _|_|_|    _|_|_|    _|_|_|    _|_|_|  _|
//
//

export const createHttpClientReducer: (initialState: HttpClientState) => Reducer<HttpClientState, Action> = (initialState) => (state = initialState, action) => {
  if (!isHttpClientAction(action)) {
    return state
  }

  const { resultId } = action.payload

  switch (action.type) {
    case TRY_TO_FETCH:
      return {
        ...state,
        fetching: true,
        results: [
          ...state.results,
          {
            id: resultId,
            response: null,
          },
        ],
      }
    case FETCH_SUCCESSFULLY:
      const { response } = action.payload

      return {
        successful: true,
        fetching: false,
        results: [
          ...state.results.filter(({ id }) => id !== resultId),
          {
            id: resultId,
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
