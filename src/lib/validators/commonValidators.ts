import { Either, isLeft, isRight, left, right } from 'fp-ts/lib/Either'

import UnreachableError from '~/lib/errors/UnreachableError'
import conj from '~/lib/extensions/Array/conj'
import equalsJsons from '~/lib/extensions/Eq/equalsJsons'
import stripMargin from '~/lib/extensions/String/stripMargin'
import trimEols from '~/lib/extensions/String/trimEols'
import typed from '~/lib/typed'
import ValidationError from './ValidationError'

/**
 * @callback Validator
 * @throws {ValidationError} if the validation fails.
 */

/**
 * @param asT {Validator}
 * @throws {never}
 */
export const failSafe = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: A): Either<ValidationError, T> => {
  try {
    return right(asT(input))
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return left(error)
    }

    throw new UnreachableError
  }
}

export const leftOnly = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: A): ValidationError | undefined => {
  const t = failSafe(asT)(input)

  if (isLeft(t)) {
    return t.left
  } else {
    return undefined
  }
}

// TODO: Refactor
export const named = <A extends unknown, T extends A>(name: string, asT: (input: A) => T) => (input: A): T => {
  const t = failSafe(asT)(input)

  if (isLeft(t)) {
    if (t.left.values === undefined) {
      throw t.left
    }

    if (t.left.key === undefined) {
      throw new UnreachableError
    }

    throw new ValidationError(t.left.message, t.left.key, { name, ...t.left.values })
  }

  return t.right // TODO
}

export const optional = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: A | undefined): T | undefined => {
  if (input === undefined) {
    return
  }

  return asT(input)
}

export const unionOf = <A extends unknown, T extends A, U extends A>(asT: (input: A) => T, asU: (input: A) => U) => (input: A): T | U => {
  const t = failSafe(asT)(input)
  const u = failSafe(asU)(input)

  if (isLeft(t) && isLeft(u)) {
    throw new ValidationError(typed<[string, string]>`${ t.left.message } AND ${ u.left.message }`)
  }

  if (isRight(t)) {
    return t.right
  }

  if (isRight(u)) {
    return u.right
  }

  throw new UnreachableError
}

const listOf = <A extends unknown, T extends A>(asT: (input: A) => T) => (input: readonly A[]): T[] => {
  if (!Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an array.`)
  }

  return input.map(asT)
}

export const recordOf = <A extends unknown, T extends A>(asT: (input: A) => T) => asObject<Record<string, T>>('a Record', (input) => Object.entries<string, A>(input).map<[string, T]>(([key, value]) => [key, asT(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {}))

export function asUnionOf<T extends readonly Json[]>(...options: T): (input: unknown) => T[number]
export function asUnionOf<T extends readonly unknown[]>(...options: T): (input: unknown) => T[number]
export function asUnionOf<T extends readonly unknown[]>(...options: T) {
  return (input: unknown): T[number] => {
    if (!options.includes(input)) {
      throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is neigher ${ conj(options.map(String), ', ', ' nor ') }`)
    }

    return input
  }
}

/**
 * Ascribe the given JSON object to a specific type.
 *
 * @callback ObjectTyper
 * @throws {Error} if {input} is invalid as {T}.
 */

/**
 * @param className name of {T} with indefinite article
 * @param asT {ObjectTyper}
 */
export const asObject = <T>(className: string, asT: (input: any) => T) => (input: unknown): T => { // tslint:disable-line:no-any
  if (input == null) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return asT(input)
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      throw new ValidationError(trimEols(stripMargin(typed<[string, string, string]>`
        |${ JSON.stringify(input) } is not ${ className }.
        |${ error.message }
        |`)))
    }

    if (error instanceof Error) {
      console.error(error) // tslint:disable-line:no-console

      throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is not ${ className }.`)
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
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
      throw new ValidationError(typed<[string, string]>`${ JSON.stringify(inputAsJson) } is not ${ JSON.stringify(a) }.`)
    }

    return inputAsJson as T
  }
}

export function asBoolean(input: unknown): boolean {
  if (typeof input !== 'boolean') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a boolean.`)
  }

  return input
}

export function asNumber(input: unknown): number {
  if (typeof input !== 'number') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a number.`)
  }

  return input
}

export function asString(input: unknown): string {
  if (typeof input !== 'string') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a string.`)
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
    if (error instanceof ValidationError) {
      throw new ValidationError(trimEols(stripMargin(typed<[string, string]>`
        |${ JSON.stringify(input) } is not a Json.
        |${ error.message }
        |`)))
    }

    if (error instanceof Error) {
      console.error(error) // tslint:disable-line:no-console

      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Json.`)
    }

    throw new TypeError(typed<[string]>`${ String(error) } is not an error.`)
  }
}
