/**
 * HttpClient
 */

import * as pathToRegexp from 'path-to-regexp'

import { KeyValueMapObject } from '../commonTypes'

export type Method = 'GET' | 'POST'

interface Request {
  method: Method
  parameterizedEndpoint: string
  params: KeyValueMapObject<string>
  query: KeyValueMapObject<string>
}

function isEmpty(object: {}) {
  return Object.keys(object).length === 0
}

export class HttpClient {
  private static buildURL({ method, parameterizedEndpoint, params, query }: Request) {
    const endpoint = isEmpty(params) ? parameterizedEndpoint : pathToRegexp.compile(parameterizedEndpoint)(params)

    switch (method) {
      case 'GET':
        const urlBuilder = new URL(endpoint)
        const urlSearchParams = new URLSearchParams()

        Object.entries(query).forEach(([key, value]) => {
          urlSearchParams.append(key, value)
        })

        urlBuilder.search = urlSearchParams.toString()

        return urlBuilder.href
      case 'POST':
        return endpoint
    }
  }

  private static buildRequestInit({ method, query }: Request): RequestInit {
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

  public async fetch(request: Request) {
    const url = HttpClient.buildURL(request)
    const requestInit = HttpClient.buildRequestInit(request)
    const response = await fetch(url, requestInit)
    const body = await response.text()

    return { response, body }
  }
}
