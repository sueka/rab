import { isUrl } from '~/guards/stringGuards'
import typed from '~/typed'

const DUMMY_ORIGIN = 'http://example.com'

function dropDummyOrigin(x: string): string {
  const result = new RegExp(typed<[string]>`^${ DUMMY_ORIGIN }(.*)$`).exec(x)

  if (result === null) {
    throw new Error
  }

  return result[1]
}

/**
 * URL から origin を取り除いたものを表す。
 */
class PathAbempty {
  private readonly _url: URL

  constructor(...[pathAbempty, ...restArgs]: ConstructorParameters<typeof URL>) {
    this._url = new URL(typed<[string, string]>`${ DUMMY_ORIGIN }${ pathAbempty }`, ...restArgs)
  }

  get hash(): string {
    return this._url.hash
  }

  get href(): string {
    return dropDummyOrigin(this._url.href)
  }

  get origin(): string {
    return dropDummyOrigin(this._url.origin)
  }

  get pathname(): string {
    return this._url.pathname
  }

  set pathname(value: string) {
    // tslint:disable-next-line:no-object-mutation
    this._url.pathname = value
  }

  get search(): string {
    return this._url.search
  }

  set search(value: string) {
    // tslint:disable-next-line:no-object-mutation
    this._url.search = value
  }

  get searchParams(): URLSearchParams {
    return this._url.searchParams
  }

  public toJSON() {
    return dropDummyOrigin(this._url.toJSON())
  }
}

export default function createUrlOrPathAbempty(...args: ConstructorParameters<typeof URL>): URL | PathAbempty {
  const [urlOrPathAbempty] = args

  if (isUrl(urlOrPathAbempty)) {
    return new URL(...args)
  } else {
    return new PathAbempty(...args)
  }
}
