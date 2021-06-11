/**
 * src/fetch.ts
 */

import mapValues from './extensions/Record/mapValues'
import fromEntries from './polyfills/Object.fromEntries'
import typed from './typed'

type Query = Record<string, QueryValue>

type QueryValue =
  | string
  | QueryValueArray
  | QueryValueObject

type QueryValueArray = QueryValue[]
type QueryValueObject = { [member in string]: QueryValue }

type VQuery = Record<string, QueryValue>

type QueryMap = Record<string, string>

function isEmpty<T extends {}>(object: T): object is EmptyRecord<T> {
  return Object.keys(object).length === 0
}

// NOTE: メンバー代入を使わない場合、メンバーアクセスは部分関数なので、オブジェクトのキーの型を縮小することができる。ただし、 TypeScript のメンバーアクセス演算は部分関数ではない (cf. https://github.com/microsoft/TypeScript/issues/13778)
function asStringVObject<V>(input: Record<never, V>): Record<string, V> {
  return input
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

    const typeSafeInput: Record<never, unknown> = input // NOTE: object 型の仕様に問題がある。

    return mapValues(asStringVObject(typeSafeInput), toJson)
  }

  throw new Error(typed<[string]>`${ String(input) } is not a Json.`)
}

/**
 * Query を QueryMap に変換する。
 */
export /* for testing */ function toQueryMap(query: Query): QueryMap {

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

    const [[member, head], ...tailEntries] = Object.entries(value)

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

export function buildBody<T extends { append(key: string, value: string): void }>(query: Query, bodyBuilder: T): T {
  // tslint:disable-next-line:no-loop-statement
  for (const [key, value] of Object.entries(toQueryMap(query))) {
    bodyBuilder.append(key, value)
  }

  return bodyBuilder
}

class NoAnyResponse extends Response {
  constructor(private response: Response) {
    super(null, response)
  }

  public async json() {
    return toJson(await this.response.json())
  }
}

export default async function fetch(input: RequestInfo, init?: RequestInit): Promise<NoAnyResponse> {
  const response = await window.fetch(input, init) // TODO: Use globalThis

  return new NoAnyResponse(response)
}
