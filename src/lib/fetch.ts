/**
 * src/lib/fetch.ts
 */

import * as pathToRegexp from 'path-to-regexp'

import { typed } from './commonFunctions'

type Method = 'GET' | 'POST'

interface RequestParams {
  method: Method
  parameterizedEndpoint: string
  params?: Record<string, string>
  query?: Record<string, string>
}

export interface ResponseParams {
  response: Response
  body: Json
}

function isEmpty(object: {}) {
  return Object.keys(object).length === 0
}

function buildRequestInfo({ method, parameterizedEndpoint, params = {}, query = {} }: RequestParams): RequestInfo {
  const endpoint = isEmpty(params) ? parameterizedEndpoint : pathToRegexp.compile(parameterizedEndpoint)(params)

  switch (method) {
    case 'GET':
      const urlSearchParams = new URLSearchParams()

      Object.entries(query).forEach(([key, value]) => {
        urlSearchParams.append(key, value)
      })

      // TODO: endpoint に search が含まれる場合の処理

      const search = urlSearchParams.toString()

      if (search !== '') {
        return typed<string>`${ endpoint }?${ urlSearchParams.toString() }`
      }

      return endpoint
    case 'POST':
      return endpoint
  }
}

function buildRequestInit({ method, query = {} }: RequestParams): RequestInit {
  switch (method) {
    case 'GET':
      return {
        method,
      }
    case 'POST':
      const formData = new FormData()

      Object.entries(query).forEach(([key, value]) => {
        formData.append(key, value)
      })

      return {
        method,
        body: formData,
      }
  }
}

export default async function fetch(request: RequestParams): Promise<ResponseParams> {
  const requestInfo = buildRequestInfo(request)
  const requestInit = buildRequestInit(request)
  const response = await globalThis.fetch(requestInfo, requestInit)

  // NOTE: Body#json() の返り値型は Promise<any> なので、この型指定は型キャストではない。
  const body = await response.json() as Json

  return { response, body }
}
