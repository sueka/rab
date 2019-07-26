import { ValidationError } from 'src/lib/errors'
import { typed } from 'src/lib/commonFunctions'
import { optional, asString } from './commonValidators'

export function asGetRepoResponse(input: Json): GetRepoResponse {
  return asRepository(input)
}

function asRepository(input: Json): Repository {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      name: asString(input.name),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Repository.`)
    }

    throw error
  }
}

export function asUnsuccessfulResponse(input: Json): UnsuccessfulResponse {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      message: asString(input.message),
      documentation_url: optional(asString)(input.documentation_url),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an UnsuccessfulResponse.`)
    }

    throw error
  }
}
