/**
 * HttpClient
 */

import * as pathToRegexp from 'path-to-regexp'

import { Json } from '../commonTypes'

export type Method = 'GET' | 'POST'

interface RequestParams {
  method: Method
  parameterizedEndpoint: string
  params: Record<string, string>
  query: Record<string, string>
}

export interface ResponseParams {
  response: Response
  body: Json
}

function isEmpty(object: {}) {
  return Object.keys(object).length === 0
}

export class HttpClient {
  private static buildURL({ method, parameterizedEndpoint, params, query }: RequestParams) {
    const endpoint = isEmpty(params) ? parameterizedEndpoint : pathToRegexp.compile(parameterizedEndpoint)(params)

    switch (method) {
      case 'GET':
        const urlBuilder = new URL(endpoint)
        const urlSearchParams = new URLSearchParams()

        Object.entries(query).forEach(([key, value]) => {
          urlSearchParams.append(key, value)
        })

        // tslint:disable-next-line:no-object-mutation
        urlBuilder.search = urlSearchParams.toString()

        return urlBuilder.href
      case 'POST':
        return endpoint
    }
  }

  private static buildRequestInit({ method, query }: RequestParams): RequestInit {
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

  public async fetch(request: RequestParams): Promise<ResponseParams> {
    const url = HttpClient.buildURL(request)
    const requestInit = HttpClient.buildRequestInit(request)
    const response = await fetch(url, requestInit)

    // NOTE: Body#json() の返り値の型は Promise<any> なので、アップキャストではない。
    const body: Json = await response.json()

    return { response, body }
  }
}
