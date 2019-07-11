import { ValidationError } from '../errors'
import { validateAsString, validateAsOptionalString } from './commonValidators'

export function validateAsGetRepoResponse(input: Json): GetRepoResponse {
  return validateAsRepository(input)
}

function validateAsRepository(input: Json): Repository {
  if (input == null) {
    throw new ValidationError(`${ input } is not an object.`)
  }

  try {
    return {
      name: validateAsString(input.name),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(`${ input } is not a Repository.`)
    }

    throw error
  }
}

export function validateAsUnsuccessfulResponse(input: Json): UnsuccessfulResponse {
  if (input == null) {
    throw new ValidationError(`${ input } is not an object.`)
  }

  try {
    return {
      message: validateAsString(input.message),
      documentation_url: validateAsOptionalString(input.documentation_url),
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new ValidationError(`${ input } is not an UnsuccessfulResponse.`)
    }

    throw error
  }
}
