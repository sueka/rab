import { either } from 'fp-ts'

import { UnreachableError, ValidationError } from 'src/lib/errors'
import { typed, conj } from 'src/lib/commonFunctions'
import equalsJsons from 'src/lib/equalsJsons'

export const failSafe = <T>(asT: (input: Json) => T) => (input: Json): either.Either<ValidationError, T> => {
  try {
    return either.right(asT(input))
  } catch (error) {
    if (error instanceof ValidationError) {
      return either.left(error)
    }

    throw error
  }
}

export const optional = <T>(asT: (input: Json) => T) => (input: Json | undefined): T | undefined => {
  if (input !== undefined) {
    return asT(input)
  }

  return
}

export const unionOf = <T, U>(asT: (input: Json) => T, asU: (input: Json) => U) => (input: Json): T | U => {
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

  throw new UnreachableError()
}

export const recordOf = <T>(asT: (input: Json) => T) => (input: Json): Record<string, T> => {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return Object.entries(input).map<[string, T]>(([key, value]) => [key, asT(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {})
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Record.`)
    }

    throw error
  }
}

export const asUnionOf = <T extends readonly unknown[]>(options: T) => (input: Json): T[number] => {
  if (!options.includes(input)) {
    throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is neigher ${ conj(', ', ' nor ', options.map(String)) }`)
  }

  return input
}

export function asConstant<T extends null>(a: T): (input: Json) => T
export function asConstant<T extends boolean>(a: T): (input: Json) => T
export function asConstant<T extends number>(a: T): (input: Json) => T
export function asConstant<T extends string>(a: T): (input: Json) => T
export function asConstant<T extends JsonArray>(a: T): (input: Json) => T
export function asConstant<T extends JsonObject>(a: T): (input: Json) => T
export function asConstant<T extends Json>(a: T): (input: Json) => T {
  return (input) => {
    if (!equalsJsons(input, a)) {
      throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is not ${ JSON.stringify(a) }.`)
    }

    return a
  }
}

export function asBoolean(input: Json): boolean {
  if (typeof input !== 'boolean') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a boolean.`)
  }

  return input
}

export function asNumber(input: Json): number {
  if (typeof input !== 'number') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a number.`)
  }

  return input
}

export function asString(input: Json): string {
  if (typeof input !== 'string') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a string.`)
  }

  return input
}
