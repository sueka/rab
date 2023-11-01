import { shouldBePresent } from "~/asserters/commonAsserters"

export abstract class CookieStore {
  abstract getAll(name: string): Promise<SmallCookie[]>

  constructor() {
    throw new TypeError('Illegal constructor')
  }
}

interface Cookie {
  domain: string
  expires: number // Unix time
  name: string
  partitioned: boolean
  path: string
  sameSite: 'strict' | 'lax' | 'none'
  secure: boolean
  value: string
}

type SmallCookie = Alt.SoftOmit<
  Cookie,
  | 'domain'
  | 'expires'
  | 'partitioned'
  | 'path'
  | 'sameSite'
  | 'secure'
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
}

Object.setPrototypeOf(cookieStore, CookieStore.prototype)

export default cookieStore
