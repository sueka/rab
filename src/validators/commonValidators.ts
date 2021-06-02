import { Either, isLeft, isRight, left, right } from 'fp-ts/lib/Either'

import UnreachableError from '~/errors/UnreachableError'
import conj from '~/extensions/Array/conj'
import equalsJsons from '~/extensions/Eq/equalsJsons'
import stripMargin from '~/extensions/String/stripMargin'
import trimEols from '~/extensions/String/trimEols'
import typed from '~/typed'

/**
 * @callback Validator
 * @throws [[Error]] if the validation fails.
 */

/**
 * @param asT [[Validator]]
 * @nothrow
 */
export const failSafe = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: A): Either<Error, T> => {
  try {
    return right(asT(input))
  } catch (error: unknown) {
    if (error instanceof Error) {
      return left(error)
    }

    throw new UnreachableError
  }
}

export const leftOnly = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: A): Error | undefined => {
  const t = failSafe(asT)(input)

  if (isLeft(t)) {
    return t.left
  } else {
    return undefined
  }
}

export const optional = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: A | undefined): T | undefined => {
  if (input === undefined) {
    return
  }

  return asT(input)
}

export const ignore = <A>(asX: (input: A) => unknown) => (input: A): undefined => {
  asX(input)

  return
}

export const required = <A extends unknown, T extends A>(asT: (input: A | undefined) => T | undefined) => (input: A | undefined): T => {
  const inputAsT = asT(input)

  if (inputAsT === undefined) {
    throw new Error('It must exist.')
  }

  return inputAsT
}

export const asRequired = <A extends unknown>(input: A | undefined): A => {
  if (input === undefined) {
    throw new Error('It must exist.')
  }

  return input
}

export const unionOf = <A extends unknown, T extends A, U extends A>(asT: (input: A) => T, asU: (input: A) => U) => (input: A): T | U => {
  const t = failSafe(asT)(input)
  const u = failSafe(asU)(input)

  if (isLeft(t) && isLeft(u)) {
    throw new Error(typed<[string, string]>`${ t.left.message } AND ${ u.left.message }`)
  }

  if (isRight(t)) {
    return t.right
  }

  if (isRight(u)) {
    return u.right
  }

  throw new UnreachableError
}

export const listOf = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: readonly A[]): T[] => {
  if (!Array.isArray(input)) {
    throw new Error(typed<[string]>`${ JSON.stringify(input) } is not an array.`)
  }

  return input.map(asT)
}

export const recordOf = <A extends unknown, T extends A>(asT: (input: A) => T) => asObject<Record<string, T>>((input) => Object.entries<string, A>(input).map<[string, T]>(([key, value]) => [key, asT(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {}))

export function asUnionOf<T extends readonly Json[]>(...options: T): (input: unknown) => T[number]
export function asUnionOf<T extends readonly unknown[]>(...options: T): (input: unknown) => T[number]
export function asUnionOf<T extends readonly unknown[]>(...options: T) {
  return (input: unknown): T[number] => {
    if (!options.includes(input)) {
      throw new Error(typed<[string, string]>`${ JSON.stringify(input) } is neither ${ conj(options.map(String), ', ', ' nor ') }`)
    }

    return input
  }
}

/**
 * Ascribe the given JSON object to a specific type.
 *
 * @callback ObjectTyper
 * @throws [[Error]] if `input` is invalid as `T`.
 */

/**
 * @param className name of {T} with indefinite article
 * @param asT [[ObjectTyper]]
 */
export const asObject = <T>(asT: (input: any) => T) => (input: unknown): T => { // tslint:disable-line:no-any
  if (input == null) {
    throw new Error(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  return asT(input)
}

export const asInstanceOf = <T>(Class: new (...args: any[]) => T) => (input: unknown): T => { // tslint:disable-line:no-any
  if (input instanceof Class) {
    return input
  } else {
    throw new Error(typed<[string, string]>`${ JSON.stringify(input) } is not a/an ${ Class.name }.`)
  }
}

// TODO: undefined, symbol, bigint, bigdecimal 等に拡張する
export function asConstant<T extends null>(a: T): (input: unknown) => T
export function asConstant<T extends boolean>(a: T): (input: unknown) => T
export function asConstant<T extends number>(a: T): (input: unknown) => T
export function asConstant<T extends string>(a: T): (input: unknown) => T
export function asConstant<T extends JsonArray>(a: T): (input: unknown) => T
export function asConstant<T extends JsonObject>(a: T): (input: unknown) => T
export function asConstant<T extends Json>(a: T): (input: unknown) => T {
  return (input) => {
    const inputAsJson = asJson(input)

    if (!equalsJsons(inputAsJson, a)) {
      throw new Error(typed<[string, string]>`${ JSON.stringify(inputAsJson) } is not ${ JSON.stringify(a) }.`)
    }

    return inputAsJson as T // NOTE: !equalsJsons(a, b) → a is not a typeof b ではないので、 equalsJsons で inputAsJson の型を狭めることはできない。
  }
}

export function asBoolean(input: unknown): boolean {
  if (typeof input !== 'boolean') {
    throw new Error(typed<[string]>`${ JSON.stringify(input) } is not a boolean.`)
  }

  return input
}

export function asNumber(input: unknown): number {
  if (typeof input !== 'number') {
    throw new Error(typed<[string]>`${ JSON.stringify(input) } is not a number.`)
  }

  return input
}

export function asString(input: unknown): string {
  if (typeof input !== 'string') {
    throw new Error(typed<[string]>`${ JSON.stringify(input) } is not a string.`)
  }

  return input
}

export function asJson(input: unknown): Json {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string') {
    return input
  }

  if (Array.isArray(input)) {
    return listOf(asJson)(input)
  }

  try {
    return recordOf(asJson)(input)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(trimEols(stripMargin(typed<[string, string]>`
        |${ JSON.stringify(input) } is not a Json.
        |${ error.message }
        |`)))
    }

    if (error instanceof Error) {
      console.error(error) // tslint:disable-line:no-console

      throw new Error(typed<[string]>`${ JSON.stringify(input) } is not a Json.`)
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }
}
