/**
 * src/lib/fetch.ts
 */

import * as pathToRegexp from 'path-to-regexp'

import createUrlOrPathAbempty from './createUrlOrPathAbempty'
import mapValues from './extensions/Record/mapValues'
import fromEntries from './polyfills/Object.fromEntries'
import typed from './typed'

type Method = 'GET' | 'POST'

interface RequestParams {
  method: Method
  parameterizedEndpoint: string
  params?: Record<string, string>
  headers?: Record<string, string>
  query?: Query
}

type Query = Record<string, QueryValue>

type QueryValue =
  | QueryValueString
  | QueryValueArray
  | QueryValueObject

type QueryValueString = string
type QueryValueArray = QueryValue[]
type QueryValueObject = { [member in string]: QueryValue }

type VQuery = Record<string, QueryValue>

type QueryMap = Record<string, string>

interface ResponseParams {
  response: Response
  body: Json
}

function isEmpty<T extends {}>(object: T): object is EmptyRecord<T> {
  return Object.keys(object).length === 0
}

function toRecord(input: {}): Record<string, unknown> {
  return Object.entries(input).reduce((result, [i, x]) => ({ ...result, [i]: x }), {})
}

function toJson(input: unknown): Json {
  if (typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string') {
    return input
  }

  if (Array.isArray(input)) {
    return input.map((json) => toJson(json))
  }

  if (typeof input === 'object') {
    if (input === null) {
      return input
    }

    return mapValues(toRecord(input), (json) => toJson(json))
  }

  throw new Error(typed<[string]>`${ String(input) } is not a Json.`)
}

/**
 * Query を QueryMap に変換する。
 */
export function toQueryMap(query: Query): QueryMap {

  /**
   * QueryValueArray を展開し、より簡単な Query を返す。
   *
   * @implNote `goWithArray(key: string, value: Record<string, QueryValue>, result: VQuery): VQuery` とすれば、 `index` を排除し、 `goWithObject` と実装を統合することができるが、配列のキーにはインデックスを含めたくない場合がある。
   */
  function goWithArray(key: string, value: QueryValueArray, index: number, result: VQuery): VQuery {
    if (value.length === 0) {
      return result
    }

    const [head, ...tail] = value

    return goWithArray(key, tail, index + 1, {
      ...result,
      [typed<[string, number]>`${ key }[${ index }]`]: head,
    })
  }

  /**
   * QueryValueObject を展開し、より簡単な Query を返す。
   */
  function goWithObject(key: string, value: QueryValueObject, result: VQuery): VQuery {
    if (isEmpty(value)) {
      return result
    }

    const [[member, head], ...tailEntries] = Object.entries<string, QueryValue>(value)

    return goWithObject(key, fromEntries(tailEntries), {
      ...result,
      [typed<[string, string]>`${ key }[${ member }]`]: head,
    })
  }

  function go(q: Query, result: QueryMap): QueryMap {
    if (isEmpty(q)) {
      return result
    }

    const [[key, value], ...tail] = Object.entries(q)

    if (typeof value === 'string') {
      return go(fromEntries(tail), {
        ...result,
        [key]: value,
      })
    }

    if (Array.isArray(value)) {
      return go(goWithArray(key, value, 0, fromEntries(tail)), result)
    }

    return go(goWithObject(key, value, fromEntries(tail)), result)
  }

  return go(query, {})
}

function buildRequestInfo({ method, parameterizedEndpoint, params = {}, query = {} }: RequestParams): RequestInfo {
  const url = createUrlOrPathAbempty(parameterizedEndpoint)

  // tslint:disable-next-line:no-object-mutation
  url.pathname = isEmpty(params) ? url.pathname : pathToRegexp.compile(url.pathname)(params)

  if (method === 'GET') {
    const urlSearchParams = new URLSearchParams(url.search)

    Object.entries(toQueryMap(query)).forEach(([key, value]) => {
      urlSearchParams.append(key, value)
    })

    // tslint:disable-next-line:no-object-mutation
    url.search = urlSearchParams.toString()
  }

  return url.href
}

function buildRequestInit({ method, headers = {}, query = {} }: RequestParams): RequestInit {
  switch (method) {
    case 'GET':
      return {
        method,
        headers,
      }
    case 'POST':
      const formData = new FormData

      Object.entries(toQueryMap(query)).forEach(([key, value]) => {
        formData.append(key, value)
      })

      return {
        method,
        body: formData,
        headers,
      }
  }
}

export default async function fetch(request: RequestParams): Promise<ResponseParams> {
  const requestInfo = buildRequestInfo(request)
  const requestInit = buildRequestInit(request)
  const response = await globalThis.fetch(requestInfo, requestInit)

  const body = toJson(await response.json())

  return { response, body }
}
