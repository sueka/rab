import { either } from 'fp-ts'

import { UnreachableError, ValidationError } from 'src/lib/errors'
import { typed, conj } from 'src/lib/commonFunctions'
import equalsJsons from 'src/lib/equalsJsons'

export const failSafe = <T>(validate: (input: Json) => T) => (input: Json): either.Either<ValidationError, T> => {
  try {
    return either.right(validate(input))
  } catch (error) {
    if (error instanceof ValidationError) {
      return either.left(error)
    }

    throw error
  }
}

export const optional = <T>(validate: (input: Json) => T) => (input: Json | undefined): T | undefined => {
  if (input !== undefined) {
    return validate(input)
  }

  return
}

export const oneOf = <T extends readonly unknown[]>(options: T) => (input: Json): T[number] => {
  if (!options.includes(input)) {
    throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is neigher ${ conj(', ', ' nor ', options.map(String)) }`)
  }

  return input
}

export const unionOf = <T, U>(validateAsT: (input: Json) => T, validateAsU: (input: Json) => U) => (input: Json): T | U => {
  const t = failSafe(validateAsT)(input)
  const u = failSafe(validateAsU)(input)

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

export const recordOf = <T>(validate: (input: Json) => T) => (input: Json): Record<string, T> => {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return Object.entries(input).map<[string, T]>(([key, value]) => [key, validate(value)]).reduce<Record<string, T>>((output, [key, value]) => ({ ...output, [key]: value }), {})
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Record.`)
    }

    throw error
  }
}

export function constant<T extends null>(a: T): (input: Json) => T
export function constant<T extends boolean>(a: T): (input: Json) => T
export function constant<T extends number>(a: T): (input: Json) => T
export function constant<T extends string>(a: T): (input: Json) => T
export function constant<T extends JsonArray>(a: T): (input: Json) => T
export function constant<T extends JsonObject>(a: T): (input: Json) => T
export function constant<T extends Json>(a: T): (input: Json) => T {
  return (input) => {
    if (!equalsJsons(input, a)) {
      throw new ValidationError(typed<[string, string]>`${ JSON.stringify(input) } is not ${ JSON.stringify(a) }.`)
    }

    return a
  }
}

export function string(input: Json): string {
  if (typeof input !== 'string') {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a string.`)
  }

  return input
}
