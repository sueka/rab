import { either } from 'fp-ts'

import { UnreachableError, ValidationError } from '~/lib/errors'
import conj from '~/lib/extensions/String/conj'
import typed from '~/lib/typed'
import stripMargin from '~/lib/extensions/String/stripMargin'
import trimEols from '~/lib/extensions/String/trimEols'
import equalsJsons from '~/lib/extensions/Eq/equalsJsons'

/**
 * @callback Validator
 * @throws {ValidationError} if the validation fails.
 */

/**
 * @param asT {Validator}
 * @throws {never}
 */
export const failSafe = <A extends unknown, T>(asT: (input: A) => T) => (input: A): either.Either<ValidationError, T> => {
  try {
    return either.right(asT(input))
  } catch (error) {
    if (error instanceof ValidationError) {
      return either.left(error)
    }

    throw new UnreachableError
  }
}

export const optional = <T>(asT: (input: unknown) => T) => (input: unknown | undefined): T | undefined => {
  if (input === undefined) {
    return
  }

  return asT(input)
}

export const unionOf = <T, U>(asT: (input: unknown) => T, asU: (input: unknown) => U) => (input: unknown): T | U => {
  const t = failSafe(asT)(input)
  const u = failSafe(asU)(input)

  if (either.isLeft(t) && either.isLeft(u)) {
    throw new ValidationError(typed<[string, string]>`${ t.left.message } AND ${ u.left.message }`)
  }

  if (either.isRight(t)) {
    return t.right
  }

  if (either.isRight(u)) {
    return u.right
  }

  throw new UnreachableError
}

const listOf = <T>(asT: (input: unknown) => T) => (input: unknown): T[] => {
  if (!Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an array.`)
  }

  return input.map(asT)
}

export const recordOf = <T>(asT: (input: unknown) => T) => asObject<Record<string, T>>('a Record', (input) => Object.entries(input).map<[string, T]>(([key, value]) => [key, asT(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {}))

export function asUnionOf<T extends readonly Json[]>(...options: T): (input: unknown) => T[number]
export function asUnionOf<T extends readonly unknown[]>(...options: T): (input: unknown) => T[number]
export function asUnionOf<T extends readonly unknown[]>(...options: T) {
  return (input: unknown): T[number] => {
    if (!options.some((option) => option === input)) {
      throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is neigher ${ conj(', ', ' nor ', options.map(String)) }`)
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
  } catch (error) {
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
  } catch (error) {
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
