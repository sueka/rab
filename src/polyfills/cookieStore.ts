import { shouldBePresent } from "~/asserters/commonAsserters"

export abstract class CookieStore {
  abstract getAll(name: string): Promise<SmallCookie[]>
  abstract delete(name: string): Promise<void>

  constructor() {
    throw new TypeError('Illegal constructor')
  }
}

interface Cookie {
  name: string
  value: string
  domain?: string
  path: string
  expires?: number // Unix time
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
  partitioned: boolean
}

type SmallCookie = Alt.SoftOmit<
  Cookie,
  | 'domain'
  | 'path'
  | 'expires'
  | 'secure'
  | 'sameSite'
  | 'partitioned'
>

const cookieStore: CookieStore = {
  async getAll(name: string) {
    // Key is the substring to the left to the first = sign (if any) and value is the rest.
    const kvs = document.cookie.split(';').map(s => s.trim()).map<[string, string]>(cookie => {
      if (!cookie.includes('=')) {
        return ['', cookie]
      }

      const [key, ...values] = cookie.split('=')
      const value = values.join('=')

      shouldBePresent(key)

      return [key, value]
    })

    return kvs.filter(([key, _value]) => key === name).map(([key, value]) => ({
      name: key,
      value,
    }))
  },

  async delete(name: string) {
    document.cookie = `${ name }=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  }
}

Object.setPrototypeOf(cookieStore, CookieStore.prototype)

export default cookieStore
