import { ValidationError } from '../errors'
import { validateAsString, validateAsOptionalString } from './commonValidators'

// tslint:disable-next-line:no-any
export function validateAsGetRepoResponse(input: any): GetRepoResponse {
  return validateAsRepository(input)
}

// tslint:disable-next-line:no-any
function validateAsRepository(input: any): Repository {
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

// tslint:disable-next-line:no-any
export function validateAsUnsuccessfulResponse(input: any): UnsuccessfulResponse {
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
