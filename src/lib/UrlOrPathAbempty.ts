import typed from '~/lib/typed'

const DUMMY_ORIGIN = 'http://example.com'

function dropDummyOrigin(x: string): string {
  const result = new RegExp(typed<[string]>`(?<=^${ DUMMY_ORIGIN }).*$`).exec(x)

  if (result === null) {
    throw new Error
  }

  return result[0]
}

function isUrl(input: string): boolean {
  try {
    // tslint:disable-next-line:no-unused-expression
    new URL(input)

    return true
  } catch (_error) {
    return false
  }
}

/**
 * URL から origin を取り除いたものを表す。
 */
class PathAbempty implements URL {
  private readonly _url: URL

  constructor(...[pathAbempty, ...restArgs]: ConstructorParameters<typeof URL>) {
    this._url = new URL(typed<[string, string]>`${DUMMY_ORIGIN}${pathAbempty}`, ...restArgs)
  }

  get host(): string {
    throw new Error // TODO:
  }

  get hostname(): string {
    throw new Error // TODO:
  }

  get password(): string {
    throw new Error // TODO:
  }

  get port(): string {
    throw new Error // TODO:
  }

  get protocol(): string {
    throw new Error // TODO:
  }

  get username(): string {
    throw new Error // TODO:
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

// tslint:disable-next-line:max-classes-per-file
export default class UrlOrPathAbempty implements URL {
  private readonly _instance: URL | PathAbempty

  constructor(...args: ConstructorParameters<typeof URL>) {
    const [urlOrPathAbempty] = args

    if (isUrl(urlOrPathAbempty)) {
      this._instance = new URL(...args)
    } else {
      this._instance = new PathAbempty(...args)
    }
  }

  get hash(): string {
    return this._instance.hash
  }

  get host(): string {
    return this._instance.host
  }

  get hostname(): string {
    return this._instance.hostname
  }

  get href(): string {
    return this._instance.href
  }

  get origin(): string {
    return this._instance.origin
  }

  get password(): string {
    return this._instance.password
  }

  get pathname(): string {
    return this._instance.pathname
  }

  get port(): string {
    return this._instance.port
  }

  get protocol(): string {
    return this._instance.protocol
  }

  get search(): string {
    return this._instance.search
  }

  set search(value: string) {
    // tslint:disable-next-line:no-object-mutation
    this._instance.search = value
  }

  get searchParams(): URLSearchParams {
    return this._instance.searchParams
  }

  get username(): string {
    return this._instance.username
  }

  public toJSON() {
    return this._instance.toJSON()
  }
}
