import { ValidationError } from 'src/lib/errors'
import { typed } from 'src/lib/commonFunctions'
import { optional, string } from './commonValidators'

export function GetRepoResponse(input: Json): GetRepoResponse {
  return Repository(input)
}

function Repository(input: Json): Repository {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      name: string(input.name),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not a Repository.`)
    }

    throw error
  }
}

export function UnsuccessfulResponse(input: Json): UnsuccessfulResponse {
  if (input === null || typeof input === 'boolean' || typeof input === 'number' || typeof input === 'string' || Array.isArray(input)) {
    throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an object.`)
  }

  try {
    return {
      message: string(input.message),
      documentation_url: optional(string)(input.documentation_url),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(typed<[string]>`${ JSON.stringify(input) } is not an UnsuccessfulResponse.`)
    }

    throw error
  }
}
